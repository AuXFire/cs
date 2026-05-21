# codemesh — Technical Specification v1.0

## Product Summary

codemesh is a multi-tenant LLM gateway and cost intelligence platform. It sits between customer applications and LLM providers (Anthropic, OpenAI, Google), automatically applies token-saving interventions, and provides per-team/per-feature/per-prompt spend attribution via a web dashboard.

**Business model:** BYOK (Bring Your Own Key). Customers route their LLM traffic through codemesh; codemesh never pays for tokens. Revenue from monthly platform subscriptions tiered by token volume routed.

**Pricing tiers (for context, not implementation):**
- Developer: $99/mo — up to 50M tokens routed
- Team: $999/mo — up to 1B tokens routed
- Enterprise: $5k/mo+ — unlimited, with compliance features (out of v1 scope)

## Architecture Overview

Four services, deployable as a monolith for v1:

1. **Gateway** — HTTP proxy that accepts requests, applies interventions, forwards to providers
2. **Optimization engine** — In-process module the gateway calls for interventions
3. **Storage & analytics** — Postgres (transactional) + time-series aggregation for spend data
4. **Dashboard** — Next.js web app for visibility, configuration, billing

For v1, services 1+2 run in a single Node.js process. Service 3 is Postgres. Service 4 is a separate Next.js deployment.

## Tech Stack

- **Language:** TypeScript everywhere
- **Gateway runtime:** Hono framework on Node.js 20+ (deploy to Fly.io for v1; Cloudflare Workers later for edge)
- **Dashboard:** Next.js 14 (App Router) on Vercel
- **Database:** PostgreSQL 16 (Neon or Supabase for managed)
- **Cache/queue:** Redis (Upstash) for dedup cache, rate limits, ephemeral state
- **Embeddings (for semantic dedup):** OpenAI `text-embedding-3-small` (cheap, fast)
- **Auth:** Clerk or Auth.js for dashboard; API key auth for gateway
- **Payments:** Stripe (subscriptions + metered usage)
- **Encryption:** Node `crypto` with envelope encryption; KMS in production (AWS KMS or GCP KMS)
- **Observability:** OpenTelemetry; Axiom or Better Stack for logs

## Repository Structure

```
codemesh/
├── apps/
│   ├── gateway/          # Hono service — the proxy + optimization engine
│   └── dashboard/        # Next.js app — customer-facing UI
├── packages/
│   ├── db/               # Drizzle ORM schemas + migrations
│   ├── core/             # Shared types, intervention logic, measurement
│   ├── providers/        # Provider-specific adapters (Anthropic, OpenAI, Google)
│   └── crypto/           # Key encryption utilities
├── docker-compose.yml    # Local Postgres + Redis
└── turbo.json            # Monorepo orchestration
```

## Core Concepts

### Tenancy
Every API call belongs to a `tenant` (the paying customer org). Tenants have:
- One or more `provider_keys` (encrypted customer-supplied keys for Anthropic/OpenAI/Google)
- A `codemesh_api_key` (what the customer uses to authenticate to the gateway)
- Optional `teams` and `features` for attribution
- `routing_rules` configuration

### Request Flow

```
Customer App
    │
    │ POST https://gateway.codemesh.dev/v1/messages
    │ Headers:
    │   Authorization: Bearer cmk_live_xxx       (codemesh API key)
    │   x-codemesh-team: agents                  (optional attribution)
    │   x-codemesh-feature: planner              (optional attribution)
    │ Body: standard Anthropic/OpenAI request
    ▼
[Gateway]
    ├─ 1. Authenticate codemesh key → resolve tenant
    ├─ 2. Detect provider from path (/v1/messages = Anthropic, /v1/chat/completions = OpenAI)
    ├─ 3. Decrypt tenant's provider key for that provider
    ├─ 4. Pre-flight interventions (mutate request):
    │     - Dedup check (return cached if hit)
    │     - Cache control injection
    │     - Tool subset pruning
    │     - Model routing (if rules apply)
    ├─ 5. Forward to provider with customer's key
    ├─ 6. Stream response back (SSE passthrough OR JSON)
    ├─ 7. On completion: emit usage event with intervention attribution
    │
    ▼
[Storage]
    └─ Write request_log row + intervention rows
       Aggregate to spend_buckets (hourly rollup) async

[Dashboard]
    └─ Reads from storage, renders visibility
```

## Database Schema (Postgres / Drizzle)

```typescript
// Tenants
tenants {
  id: uuid (pk)
  name: text
  created_at: timestamp
  plan: enum('developer', 'team', 'enterprise')
  monthly_token_quota: bigint
  status: enum('active', 'suspended')
}

// codemesh API keys (what customers use to auth)
api_keys {
  id: uuid (pk)
  tenant_id: uuid (fk → tenants)
  key_hash: text (sha256 of the actual key)
  key_prefix: text (first 12 chars for display: 'cmk_live_xxx')
  name: text
  created_at: timestamp
  last_used_at: timestamp
  revoked_at: timestamp (nullable)
}

// Customer's provider keys (encrypted)
provider_keys {
  id: uuid (pk)
  tenant_id: uuid (fk → tenants)
  provider: enum('anthropic', 'openai', 'google')
  encrypted_key: bytea  -- envelope-encrypted
  key_fingerprint: text  -- for display (last 4)
  created_at: timestamp
}

// Every gateway request
request_logs {
  id: uuid (pk)
  tenant_id: uuid (fk, indexed)
  api_key_id: uuid (fk)
  provider: enum('anthropic', 'openai', 'google')
  model_requested: text
  model_used: text  -- may differ if routing intervention fired
  team: text (nullable, indexed)
  feature: text (nullable, indexed)
  input_tokens: int
  output_tokens: int
  cached_input_tokens: int
  cost_usd_micros: bigint  -- microcents to avoid float math
  latency_ms: int
  status: enum('success', 'error', 'timeout', 'cached_dedup')
  created_at: timestamp (indexed)
  request_hash: text  -- for dedup
}
-- Index: (tenant_id, created_at DESC) for dashboard queries
-- Index: (tenant_id, team, created_at) for attribution
-- Index: (request_hash, created_at) for dedup lookup

// Interventions applied to each request
interventions {
  id: uuid (pk)
  request_log_id: uuid (fk → request_logs, indexed)
  type: enum('cache_control_injected', 'dedup_hit', 'tool_pruned', 'model_routed', 'context_trimmed')
  tokens_saved: int  -- best-effort attribution
  cost_saved_usd_micros: bigint
  metadata: jsonb  -- intervention-specific details
}

// Hourly rollups for fast dashboard queries
spend_buckets {
  tenant_id: uuid
  hour: timestamp  -- truncated to hour
  team: text (nullable)
  feature: text (nullable)
  provider: text
  model: text
  request_count: int
  input_tokens: bigint
  output_tokens: bigint
  cost_usd_micros: bigint
  savings_usd_micros: bigint
  PRIMARY KEY (tenant_id, hour, team, feature, provider, model)
}

// Routing rules (customer-configured)
routing_rules {
  id: uuid (pk)
  tenant_id: uuid (fk)
  name: text
  enabled: boolean
  match_team: text (nullable)
  match_feature: text (nullable)
  match_model: text (nullable)
  action: enum('route_to_cheaper', 'block', 'alert')
  target_model: text (nullable)
  created_at: timestamp
}

// Detected stable prefixes for cache control automation
cache_prefixes {
  id: uuid (pk)
  tenant_id: uuid (fk)
  prefix_hash: text  -- hash of the stable content
  token_count: int
  first_seen_at: timestamp
  last_seen_at: timestamp
  hit_count: int
  cache_control_inserted: boolean
}

// Dedup cache (or store in Redis with TTL)
dedup_cache {
  request_hash: text (pk)
  tenant_id: uuid
  response_body: jsonb
  expires_at: timestamp  -- 60s default TTL
}
```

## Gateway Implementation Details

### Authentication

```typescript
// Middleware: extract codemesh API key, resolve tenant
async function authenticate(c: Context, next: Next) {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer cmk_')) {
    return c.json({ error: 'Missing or invalid API key' }, 401)
  }
  const key = auth.slice(7)
  const keyHash = sha256(key)
  const apiKey = await db.query.apiKeys.findFirst({
    where: and(eq(apiKeys.keyHash, keyHash), isNull(apiKeys.revokedAt)),
    with: { tenant: true }
  })
  if (!apiKey || apiKey.tenant.status !== 'active') {
    return c.json({ error: 'Invalid or revoked key' }, 401)
  }
  c.set('tenant', apiKey.tenant)
  c.set('apiKey', apiKey)
  await next()
}
```

### Provider Routing

The gateway exposes provider-compatible endpoints:

- `POST /v1/messages` → Anthropic (`https://api.anthropic.com/v1/messages`)
- `POST /v1/chat/completions` → OpenAI (`https://api.openai.com/v1/chat/completions`)
- `POST /v1beta/models/:model:generateContent` → Google

Customers change their base URL only. Request/response shapes are unchanged.

### SSE Streaming Passthrough (CRITICAL)

~70% of LLM traffic uses Server-Sent Events. This is the hardest part of the gateway.

Requirements:
- Pipe provider's SSE stream directly to client byte-by-byte (no buffering full response)
- Forward `Content-Type: text/event-stream` correctly
- Handle client abort: when customer's client disconnects, abort the upstream request (saves tokens AND money)
- Parse SSE events as they flow through to extract usage data from final event
- Never block the stream on storage writes — fire-and-forget to a queue

```typescript
async function streamProxy(c: Context, providerUrl: string, headers: Headers, body: string) {
  const upstream = await fetch(providerUrl, { method: 'POST', headers, body })
  if (!upstream.body) throw new Error('No upstream body')

  // Handle client abort
  const abortController = new AbortController()
  c.req.raw.signal.addEventListener('abort', () => abortController.abort())

  return new Response(
    new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader()
        const decoder = new TextDecoder()
        let usageData: UsageData | null = null

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (abortController.signal.aborted) {
              reader.cancel()
              break
            }
            controller.enqueue(value)
            // Parse chunks to extract usage from final event
            const text = decoder.decode(value, { stream: true })
            usageData = parseUsageFromSSE(text, usageData)
          }
        } finally {
          controller.close()
          if (usageData) {
            // Fire-and-forget logging
            queueRequestLog(usageData).catch(console.error)
          }
        }
      }
    }),
    { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } }
  )
}
```

### Key Encryption

Use envelope encryption: a per-tenant data encryption key (DEK) encrypts the provider key, and the DEK is encrypted with a master KMS key.

```typescript
// On storing a provider key
async function storeProviderKey(tenantId: string, provider: string, plaintextKey: string) {
  const dek = crypto.randomBytes(32)
  const cipher = crypto.createCipheriv('aes-256-gcm', dek, iv)
  const encryptedKey = Buffer.concat([cipher.update(plaintextKey, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  // Encrypt the DEK with KMS
  const encryptedDek = await kms.encrypt({ KeyId: MASTER_KEY_ID, Plaintext: dek })

  await db.insert(providerKeys).values({
    tenantId, provider,
    encryptedKey: Buffer.concat([iv, authTag, encryptedKey, encryptedDek])
  })
}

// On using a provider key (cache decrypted in memory with short TTL)
async function getProviderKey(tenantId: string, provider: string): Promise<string> {
  const cached = keyCache.get(`${tenantId}:${provider}`)
  if (cached) return cached
  // ... decrypt path ...
  keyCache.set(`${tenantId}:${provider}`, plaintextKey, { ttl: 300 })
  return plaintextKey
}
```

NEVER log provider keys. NEVER include them in error messages. Scrub them from any debug output.

## Optimization Engine

Five interventions in v1. Each MUST emit attributable savings data.

### 1. Automatic Prompt Cache Optimization (HIGHEST PRIORITY)

**Mechanism:** Detect stable prefixes across a tenant's traffic. Inject `cache_control: { type: 'ephemeral' }` markers automatically.

**Anthropic specifics:**
- Cache breakpoints go in message content blocks: `{ type: 'text', text: '...', cache_control: { type: 'ephemeral' } }`
- Up to 4 cache breakpoints per request
- Minimum cacheable size: 1024 tokens (Sonnet/Opus), 2048 (Haiku)
- TTL: 5 minutes default, 1 hour available

**Detection algorithm:**
1. For each incoming request, hash the system prompt and each content block prefix
2. Store hashes in `cache_prefixes` table with token counts
3. When a prefix has been seen 3+ times in 10 minutes AND is >1024 tokens, mark as cacheable
4. On subsequent requests with that prefix, inject `cache_control` at the appropriate position
5. Emit intervention record: `type: 'cache_control_injected', tokens_saved: cached_input_tokens * 0.9`

**Savings attribution:** Provider response includes `cache_read_input_tokens`. Compare to baseline cost (non-cached input tokens). Savings = `cache_read_input_tokens * (regular_price - cached_price)`.

### 2. Semantic Deduplication

**Mechanism:** Cache responses for identical or near-identical requests within a 60s window.

**Algorithm:**
1. Compute `request_hash = sha256(model + canonicalized_messages + tools + temperature)`
2. Check Redis for `dedup:{tenant_id}:{request_hash}` — if hit, return cached response (and set `status: 'cached_dedup'`)
3. If miss, also check embedding cache: embed `messages` content, vector search recent embeddings, threshold 0.97+ similarity = near-duplicate
4. On response, store with 60s TTL: `dedup:{tenant_id}:{request_hash}` → response body

**Savings attribution:** Full request cost saved (input + output tokens).

**Tradeoff:** Streaming responses are harder to dedup (you'd need to replay). For v1, only dedup non-streaming requests OR replay cached streams chunk-by-chunk with original timing.

### 3. Tool Subset Pruning

**Mechanism:** If a request declares N tools but only K are relevant, send only K to the expensive model.

**Algorithm:**
1. If request has >5 tools AND total tool definition tokens > 2000:
2. Run a Haiku-class classifier with the user's message + tool names/descriptions → returns relevant tool indices
3. Filter the tools array, forward to expensive model
4. Cache classification results by `hash(user_message + tool_set_hash)` for 5 min

**Savings attribution:** `(removed_tool_tokens) × input_token_price`

**Cost of intervention:** One Haiku call (~$0.0001 per request). Only profitable if expected savings > $0.001.

### 4. Model Routing (with consent)

**Mechanism:** Reroute requests matching tenant-configured rules to cheaper models.

**Configuration UI in dashboard:**
```
Rule: "Route classification queries to Haiku"
  Match: team = 'support', feature = 'classifier'
  Action: route_to_cheaper
  Target: claude-haiku-4-5
  Requires: customer enables this rule (default off)
```

**Algorithm:** Before forwarding, check `routing_rules` matching the request's team/feature/model. If a rule matches and is enabled, swap the `model` field. Log original and used model in `request_logs`.

**Quality monitoring (REQUIRED):** For every routed request, track:
- Output token count (verbosity proxy)
- Whether `stop_reason` is `end_turn` vs other (completion proxy)
- If customer's app calls the gateway with a `x-codemesh-feedback: -1` header within 5 minutes, log as quality complaint

If complaint rate >2% on a routing rule, auto-disable and alert the tenant.

**Savings attribution:** `(original_model_cost - actual_cost)`

### 5. Context Trimming (opt-in per route)

**Mechanism:** For chat-style requests with long histories, summarize old turns using a cheap model.

**Algorithm:**
1. Only fires if explicitly enabled per `team`/`feature` in routing config
2. If `messages` array has >10 turns AND total input tokens >8000:
3. Take all messages except the last 4, send to Haiku with prompt: "Summarize this conversation, preserving facts and decisions."
4. Replace summarized messages with a single system message containing the summary
5. Forward to original model

**Savings attribution:** `(original_input_tokens - new_input_tokens) × input_price`

**Tradeoff:** Adds ~500ms latency for the summarization call, and there's a small accuracy hit. Default: OFF.

## Measurement Engine (CRITICAL)

The savings number shown to customers IS the product. If it's wrong, customers churn.

### Attribution Rules

Each intervention produces an `interventions` row with `tokens_saved` and `cost_saved_usd_micros`. The values MUST be computable from observable data:

- **Cache control injected:** `tokens_saved = cache_read_input_tokens` (reported by provider); `cost_saved = tokens_saved × (input_price - cached_price)`
- **Dedup hit:** `tokens_saved = full_request_token_estimate`; `cost_saved = full_request_cost_estimate` (estimate from prior identical request)
- **Tool pruned:** `tokens_saved = removed_tool_tokens` (computed from removed tool defs); `cost_saved = tokens_saved × input_price`
- **Model routed:** `cost_saved = expected_cost_at_original_model - actual_cost_at_used_model`
- **Context trimmed:** `tokens_saved = original_input_tokens - actual_input_tokens` (minus the summarization cost)

### Pricing Tables

Maintain a `model_pricing` table (or constants file) with current per-million-token prices for input, output, and cached input for every supported model. Update when providers change pricing.

```typescript
export const MODEL_PRICING: Record<string, ModelPrice> = {
  'claude-opus-4-7': { input: 15, output: 75, cachedInput: 1.5 },
  'claude-sonnet-4-6': { input: 3, output: 15, cachedInput: 0.3 },
  'claude-haiku-4-5': { input: 0.8, output: 4, cachedInput: 0.08 },
  // ... others ...
}
// Prices in USD per million tokens. Multiply tokens × price / 1_000_000 for USD.
// Store in micros (×1_000_000) in DB to avoid float arithmetic.
```

### Shadow Mode

For new routing rules, support a "shadow" mode: run BOTH the original and cheaper model in parallel, return the original to the user, but compare outputs and report would-have-saved metrics. Use this to validate routing rules before enabling.

## Dashboard (Next.js)

### Required Pages

1. **`/login`** — Auth via Clerk/Auth.js
2. **`/onboarding`** — Create tenant, generate first codemesh API key, add provider keys
3. **`/spend`** — Main overview (see landing page mockup)
   - MTD total spend, waste detected, projected month-end
   - Daily spend chart by team
   - Top waste sources table with apply-fix buttons
4. **`/teams`** — Breakdown by team with sortable table
5. **`/features`** — Breakdown by feature
6. **`/prompts`** — Top expensive prompt patterns (grouped by hash of normalized prompts)
7. **`/models`** — Spend by model with substitution suggestions
8. **`/rules`** — Manage routing rules (create, enable, disable, view stats)
9. **`/alerts`** — Waste alerts and configurable thresholds
10. **`/settings`** — API keys, provider keys, team members, billing

### Key Query Patterns

All dashboard queries hit `spend_buckets` (the hourly rollup), NOT `request_logs` directly. Rollups are computed by a background worker that runs every 5 minutes.

```sql
-- Spend by team for the last 21 days
SELECT
  date_trunc('day', hour) AS day,
  team,
  SUM(cost_usd_micros) / 1000000.0 AS cost_usd,
  SUM(savings_usd_micros) / 1000000.0 AS savings_usd
FROM spend_buckets
WHERE tenant_id = $1
  AND hour >= NOW() - INTERVAL '21 days'
GROUP BY day, team
ORDER BY day, team;
```

### Apply-Fix Flow

When user clicks "apply fix" on a waste source:
1. Open a modal showing the suggested change (e.g., "Enable Haiku for support.classifier — estimated $1,890/mo savings, 0% quality risk based on shadow run")
2. On confirm, create a `routing_rule` row with `enabled: true`
3. Show toast confirmation; rule takes effect on next request

## Provider Adapters

Each provider gets a small adapter module that handles:
- Path mapping (e.g., `/v1/messages` → Anthropic's endpoint)
- Header mapping (auth header name differs: `x-api-key` for Anthropic, `Authorization: Bearer` for OpenAI)
- Token counting (estimate input tokens before sending for budget enforcement)
- Response parsing (extract usage data from response or final SSE event)
- Cache control syntax (Anthropic-specific)

```typescript
// packages/providers/anthropic.ts
export const anthropicAdapter: ProviderAdapter = {
  name: 'anthropic',
  baseUrl: 'https://api.anthropic.com',
  authHeader: (key) => ({ 'x-api-key': key, 'anthropic-version': '2023-06-01' }),
  parseUsage: (response) => ({
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    cachedInputTokens: response.usage.cache_read_input_tokens ?? 0,
  }),
  parseStreamUsage: (sseEvents) => { /* extract from message_delta events */ },
  injectCacheControl: (request, breakpoints) => { /* mutate request */ },
  countTokens: (request) => { /* use tiktoken-equivalent */ },
}
```

## Background Jobs

Run these as cron jobs or scheduled workers:

1. **Spend bucket rollup** — Every 5 min: aggregate `request_logs` from last 5 min into `spend_buckets`
2. **Cache prefix detection** — Every 15 min: scan recent request_logs, identify stable prefixes for each tenant, update `cache_prefixes`
3. **Quality monitor** — Every 10 min: scan complaint rates per routing rule, auto-disable rules exceeding 2% complaint rate
4. **Waste detection** — Every hour: scan recent traffic per tenant, generate alerts for waste patterns (retry storms, expensive models on simple tasks, no caching on repeated prefixes)
5. **Usage billing sync** — Daily: report token usage to Stripe for metered billing

## Build Order

### Weeks 1–2: Foundation
- Monorepo setup (Turbo), TypeScript configs, Drizzle schemas, migrations
- Gateway shell with Hono, auth middleware, tenant resolution
- Provider adapter framework
- Anthropic non-streaming passthrough (simplest path)
- Anthropic SSE streaming passthrough with client abort handling
- Request logging to Postgres (fire-and-forget)
- Provider key envelope encryption + retrieval
- Local dev environment (docker-compose with Postgres + Redis)

### Weeks 3–4: Storage & Dashboard Bones
- All DB schemas finalized and migrated
- Spend bucket rollup worker
- Dashboard scaffold (Next.js, Clerk auth, layout)
- `/onboarding` flow: create tenant, add provider key, generate codemesh API key
- `/spend` page with real data from spend_buckets
- Pricing table for Anthropic models

### Weeks 5–6: Cache Control + Measurement
- Cache prefix detection algorithm
- Automatic `cache_control` injection in Anthropic adapter
- Intervention attribution: emit `interventions` rows
- Savings calculation pipeline
- Dashboard KPIs reflect real savings
- First end-to-end test: a sample app sending repeated requests gets cache savings, dashboard shows it

### Weeks 7–8: Dedup + Waste Detection
- Redis dedup cache implementation
- Semantic similarity check via embeddings (for non-streaming requests)
- Waste detection cron job
- Alerts surfaced in `/spend` page (top waste sources table)
- OpenAI provider adapter (parity with Anthropic)

### Weeks 9–10: Routing + Tool Pruning
- Routing rules CRUD in dashboard
- Rule engine in gateway request flow
- Quality monitoring for routed requests
- Tool subset pruning with Haiku classifier
- Shadow mode for new routing rules

### Weeks 11–12: Polish + Real-World Testing
- Google Gemini provider adapter
- Stripe billing integration
- 3 design partners onboarded
- Edge case hardening (provider outages, malformed requests, rate limit handling)
- Documentation site
- Public launch readiness

## Critical Non-Negotiables

1. **NEVER log provider keys.** Audit every log statement. Scrub any field that could contain `sk-`, `cmk_`, etc.
2. **NEVER block the gateway response on storage writes.** All logging is fire-and-forget to an in-memory queue, flushed by a background worker.
3. **NEVER silently change a customer's model without an enabled routing rule.** Trust is everything.
4. **NEVER ship a savings number you can't justify with concrete attribution.** If you can't explain how a $1,891 savings was calculated, don't show it.
5. **ALWAYS handle client abort.** When the customer's client cancels, cancel the upstream provider call immediately. This is both correct and cost-saving.
6. **ALWAYS pass through provider errors verbatim.** If Anthropic returns a 429, the customer should see Anthropic's 429, not a codemesh-wrapped error. They need to debug their own integrations.
7. **ALWAYS fail open on optimization failures.** If cache prefix detection breaks, forward the request unmodified. The optimization layer is best-effort; the gateway is mission-critical.
8. **ALWAYS encrypt provider keys at rest with envelope encryption.** One leak ends the company.

## Out of Scope for v1

- Enterprise tier features (SSO, SCIM, audit logs, PII redaction, HIPAA, VPC deployment)
- Self-hosted deployment option
- Multi-region deployment
- Custom model fine-tuning support
- Anything beyond Anthropic, OpenAI, Google providers
- Mobile dashboard
- Granular RBAC (single admin role per tenant is fine for v1)
- Webhook events to customer systems
- Public API for the dashboard data (only internal usage in v1)

## Success Criteria for v1 Launch

- A new customer can sign up, add a provider key, get a codemesh API key, and route their first request in under 5 minutes
- Routed requests add <50ms p50 latency overhead at the gateway
- Streaming responses pass through with no perceptible quality degradation
- Cache control automation produces measurable, attributable savings on a real coding-agent workload within 24 hours of integration
- The dashboard accurately shows MTD spend within ±2% of provider's actual bill (verified against the customer's actual invoice)
- Three paying design partners are using the product daily and renewing month 2
