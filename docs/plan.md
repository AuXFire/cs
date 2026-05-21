# codemesh — v1 Implementation Roadmap

Companion to [`spec.md`](./spec.md). The spec is the source of truth for architecture, schema, and intervention algorithms; this document sequences the build, defines per-phase acceptance criteria, names risks, and flags open decisions needing input before code starts.

## 1. Overview

v1 ships a multi-tenant BYOK LLM gateway that proxies traffic to Anthropic, OpenAI, and Google, applies five token-saving interventions (automatic cache control injection, semantic deduplication, tool subset pruning, model routing, context trimming), and attributes spend + savings on a Next.js dashboard. Revenue is monthly subscription tiers; codemesh never pays for tokens.

Two services in v1: a Hono gateway (with the optimization engine in-process) on Fly.io and a Next.js dashboard on Vercel, backed by Postgres (Neon) and Redis (Upstash). See `spec.md` §Architecture Overview and §Tech Stack.

## 2. Pre-flight checklist (before Phase 1)

Provision and capture credentials for:

- GitHub org + repo (this one)
- Fly.io org (gateway hosting)
- Vercel team (dashboard hosting)
- Neon project (managed Postgres 16)
- Upstash Redis (dedup cache, rate limits)
- Clerk app (dashboard auth) — see decision §5.1
- Stripe account in test mode (subscriptions + metered usage)
- AWS account + KMS master key (provider key envelope encryption)
- Axiom or Better Stack workspace (logs + OpenTelemetry sink)
- OpenAI API key (for `text-embedding-3-small` used by semantic dedup)
- Domains: `gateway.codemesh.dev`, `app.codemesh.dev`
- Secrets vault choice: 1Password or Doppler

Open the seven decisions in §5 before Phase 1 work begins — several block schema choices and infra layout.

## 3. Build phases (six phases × two weeks)

Each phase has: **Goal · Deliverables · Acceptance · Risks & mitigations · Out of scope.**

### Phase 1 (Weeks 1–2): Foundation

**Goal:** A functioning Anthropic passthrough gateway with auth, encrypted key storage, and fire-and-forget request logging — no optimization yet.

**Deliverables:**
- Turborepo monorepo: `apps/gateway`, `apps/dashboard`, `packages/{db,core,providers,crypto}`
- Drizzle schemas + migrations for `tenants`, `api_keys`, `provider_keys`, `request_logs`, `interventions`
- Hono gateway with `Authorization: Bearer cmk_…` middleware that resolves tenant + active api_key
- Anthropic non-streaming passthrough on `POST /v1/messages`
- Anthropic SSE streaming passthrough on the same path with client-abort → upstream-abort propagation
- Envelope encryption for provider keys: `aes-256-gcm` DEK per key, DEK wrapped by AWS KMS master key; in-memory plaintext cache with 300s TTL
- Local dev: docker-compose with Postgres 16 + Redis
- Fire-and-forget logging via in-process queue (no DB write blocks the gateway response)

**Acceptance:**
- `curl --no-buffer` with a valid `cmk_` key proxies a streaming Anthropic request and chunks render incrementally
- Killing the curl process cancels the upstream provider request within 100ms (verified with mock upstream that records cancellation)
- `request_logs` row exists within 2s of completion with correct token counts parsed from the final SSE event
- `grep -E "sk-|cmk_" test-logs/*.log` returns nothing — provider keys never leak to logs

**Risks & mitigations:**
- SSE client-abort propagation in Node `fetch` is fragile. Mitigation: dedicated test harness with a slow mock upstream that records abort signals.
- Key-cache TTL must be short enough that revocation takes effect quickly. Mitigation: cap at 300s and clear on `api_keys.revoked_at` update via Postgres LISTEN/NOTIFY.

**Out of scope:** interventions, dashboard UI, OpenAI/Google adapters.

### Phase 2 (Weeks 3–4): Storage + dashboard bones

**Goal:** A new customer can sign up, add a provider key, generate a codemesh key, route traffic, and see it on the dashboard.

**Deliverables:**
- Remaining Drizzle schemas: `spend_buckets`, `routing_rules`, `cache_prefixes`, `dedup_cache`
- Spend-bucket rollup worker on 5-min cadence: aggregates last 5 min of `request_logs` into `spend_buckets`
- Next.js 14 dashboard with Clerk auth, layout, nav
- `/onboarding` flow: create tenant → add Anthropic provider key → generate first `cmk_` key
- `/spend` page reading from `spend_buckets` (MTD total, daily chart by team)
- `MODEL_PRICING` constants table for current Anthropic models (input / output / cached input prices in USD per million tokens)

**Acceptance:**
- A brand-new user can sign up, add a provider key, generate a codemesh key, send 10 requests through the gateway, and see them on `/spend` within 5 minutes (matches spec launch criterion #1)
- `/spend` MTD total reconciles to `SUM(cost_usd_micros) / 1_000_000` from `request_logs` within ±0.1% (rollup correctness)

**Risks & mitigations:**
- `spend_buckets` PK includes team/feature — get the shape right on day 1; backfilling later requires replaying `request_logs` which is expensive. **Decision: store team/feature as `text NULL`, not enum.**
- Clerk org primitives don't perfectly map to "tenant" in our schema — keep `tenants` as our own table and link by `clerk_org_id`.

**Out of scope:** interventions, routing rules UI, billing.

### Phase 3 (Weeks 5–6): Cache control + measurement (the core product)

**Goal:** Automatic Anthropic cache-control injection produces measurable, attributable savings on real traffic.

**Deliverables:**
- `cache_prefixes` detection cron on 15-min cadence: hash system prompt + content-block prefixes per tenant, count occurrences, mark prefixes seen 3+ times in 10 min AND >1024 tokens as cacheable
- `cache_control: { type: 'ephemeral' }` injection in Anthropic adapter — respect the 4-breakpoint per-request limit and per-model minimum (1024 Sonnet/Opus, 2048 Haiku)
- `interventions` row emission with `type = 'cache_control_injected'`, `tokens_saved = cache_read_input_tokens` (from provider response), `cost_saved_usd_micros = tokens_saved × (input_price − cached_price)`
- "Saved" KPI on `/spend` reading from `interventions.cost_saved_usd_micros`

**Acceptance:**
- Synthetic workload of 100 sequential requests sharing a 2KB system prompt: requests 4+ show `cache_read_input_tokens > 0` in the Anthropic response
- Per-request `intervention.cost_saved_usd_micros` reconciles to `cache_read_input_tokens × (input_price − cached_price)` within ±0.5%
- Dashboard "saved" number is computed exclusively from `interventions` table — no fudge factors

**Risks & mitigations:**
- **Attribution correctness IS the product.** If savings are inflated by 5%+ on a real customer, trust evaporates. Mitigation: nightly canary-tenant parity job comparing `SUM(cost + savings)` to raw provider invoice data; alert on >1% drift.
- Cache breakpoint placement is sensitive — inserting at the wrong content-block boundary breaks downstream caching. Mitigation: unit-test the injector against recorded request fixtures.

**Out of scope:** dedup, tool pruning, routing.

### Phase 4 (Weeks 7–8): Dedup + waste detection + OpenAI

**Goal:** Eliminate identical-request waste, surface actionable waste alerts, reach OpenAI parity.

**Deliverables:**
- Redis dedup cache `dedup:{tenant_id}:{request_hash}` with 60s TTL — **non-streaming requests only in v1** (see decision §5.6)
- `request_hash = sha256(model + canonicalized_messages + tools + temperature)`
- Embedding-based near-duplicate detection: `text-embedding-3-small`, cosine threshold 0.97, gated behind a per-tenant feature flag (off by default)
- Hourly waste-detection cron: retry storms, expensive-model-on-simple-task, repeated uncached prefix
- Top-waste-sources table on `/spend` with "Apply fix" buttons (creates an enabled `routing_rule`)
- OpenAI adapter at parity with Anthropic: path mapping (`/v1/chat/completions`), header mapping (`Authorization: Bearer`), usage parsing, SSE passthrough

**Acceptance:**
- Two identical non-streaming requests within 60s: second returns cached response with `status = 'cached_dedup'`; an intervention row attributes the full request cost as savings
- Synthetic retry storm (10 identical requests/min for 5 min) surfaces a waste alert within 1h
- OpenAI passthrough handles streaming with the same client-abort guarantees as Anthropic

**Risks & mitigations:**
- Embedding-based dedup at 0.97 produces false positives on code completions and ambiguous classification. Mitigation: ship off-by-default; collect false-positive feedback from design partners before broad rollout.
- Dedup cache must be tenant-scoped — leaking responses across tenants is a critical security bug. Mitigation: enforce `tenant_id` in the cache key and add an integration test for tenant isolation.

**Out of scope:** streaming dedup (deferred — see decision §5.6), routing rules, context trimming.

### Phase 5 (Weeks 9–10): Routing + tool pruning + shadow mode

**Goal:** Customers can opt into model routing with quality safeguards, prune unused tools automatically, and validate rules with shadow runs.

**Deliverables:**
- `routing_rules` CRUD on `/rules` page (create, enable, disable, view stats)
- Rule engine in gateway pre-flight: match team/feature/model → swap `model` field; log original and used model in `request_logs`
- Quality monitoring: `stop_reason` proxy, output token verbosity proxy, `x-codemesh-feedback: -1` header capture within 5 min of response; auto-disable rule at 2% complaint rate over 50+ requests
- Tool subset pruning with Haiku classifier when `tools.length > 5 && tool_def_tokens > 2000`; cache classifications by `hash(user_message + tool_set_hash)` for 5 min
- Shadow mode runner: for a flagged rule, call both original and target model in parallel, return original, log would-have-saved metrics

**Acceptance:**
- Enabled rule "route `support.classifier` from Opus to Haiku" reroutes traffic; complaint rate <2% on 100 synthetic routed requests
- Tool pruning on a request with 10 tool defs (only 2 relevant per the user message) reduces input tokens by ≥30%
- A shadow rule produces a "would-have-saved" report after 24h without affecting customer traffic

**Risks & mitigations:**
- 2% complaint threshold is a guess. Mitigation: heavy instrumentation so we can retune from real data; make per-rule configurable (see decision §5.7).
- Tool pruning classifier costs ~$0.0001/request. Mitigation: only fire when expected savings >$0.001 per spec §Tool Subset Pruning.

**Out of scope:** context trimming (defer post-launch; spec marks it opt-in per route with measurable accuracy hit).

### Phase 6 (Weeks 11–12): Polish + launch

**Goal:** Hit all six v1 launch criteria with three paying design partners using the product daily.

**Deliverables:**
- Google Gemini adapter (path `POST /v1beta/models/:model:generateContent`)
- Stripe integration: subscription tiers (Developer / Team / Enterprise placeholder) + daily metered usage sync; idempotent re-sync on failure
- 3 design partners onboarded with white-glove integration support
- Provider outage / 429 / 5xx hardening: pass through verbatim per spec non-negotiable #6
- Documentation site (Mintlify or similar)
- `MODEL_PRICING` updated for all currently supported models across all three providers
- Status page (StatusPage / Better Stack)

**Acceptance:** All six launch criteria from `spec.md` §Success Criteria met:
1. New customer onboards and routes first request in <5 min
2. <50ms p50 gateway overhead on a 1KB request to Anthropic
3. SSE streams pass through with no perceptible quality degradation
4. Cache automation produces attributable savings on a real coding-agent workload within 24h of integration
5. Dashboard MTD spend within ±2% of provider invoice (verified against real customer invoice)
6. Three paying design partners renew into month 2

**Risks & mitigations:**
- Stripe metered billing reconciliation gaps if the daily sync misses a window. Mitigation: idempotent re-sync keyed on `(tenant_id, billing_period, meter_id)`.

## 4. Cross-cutting concerns

### Security (non-negotiable from spec)
- Provider keys: envelope encryption with `aes-256-gcm`, DEK wrapped by AWS KMS master key. Stored as `iv || authTag || encryptedKey || encryptedDek` in `provider_keys.encrypted_key`.
- Logger-level scrubbing of `sk-…`, `cmk_…`, `Authorization:` patterns — implemented once at the logger, not per call site. Audit every commit for new log statements.
- Decrypted-key cache: in-memory only, 300s TTL, never serialized to disk or shipped to telemetry.
- Auth fails closed (return 401), optimization fails open (forward request unmodified if any intervention errors). The gateway is mission-critical; the optimization layer is best-effort.

### Observability
- OpenTelemetry traces on every gateway request; each intervention emitted as a span event with `tokens_saved` and `cost_saved_usd_micros` attributes
- p50 / p95 / p99 gateway overhead dashboards live from Phase 1 — track regression continuously, not just at launch
- Provider error codes and bodies passed through verbatim — no codemesh-wrapped errors, so customers can debug their own integrations

### Testing strategy
- **Unit:** provider adapters, intervention algorithms, savings math. `spec.md` §Attribution Rules is the test oracle.
- **Integration:** end-to-end gateway tests against a recorded-response mock for each provider; tenant isolation tests for the dedup cache.
- **Load:** SSE client-abort propagation under 50+ concurrent streams, aborting half mid-stream.
- **Attribution parity:** nightly canary-tenant job comparing dashboard `cost + savings` totals to raw provider invoice data; alerts on >1% drift. This is the regression test for the core product promise.

## 5. Open decisions (need input before Phase 1)

1. **Auth provider:** Clerk vs Auth.js. **Recommend Clerk** for v1 (faster onboarding, org primitives map to tenant model). Migrate post-launch if cost hurts.
2. **Managed Postgres:** Neon vs Supabase. **Recommend Neon** (branching → preview envs; Clerk handles auth so Supabase's auth bundle is moot).
3. **KMS provider:** AWS KMS vs GCP KMS. **Recommend AWS KMS** (spec targets Fly.io for v1; AWS regions co-locate well with Fly.io regions).
4. **Hosting:** Spec says Fly.io for v1 → Cloudflare Workers later. Confirm Fly.io for v1 (impacts KMS and observability choices).
5. **Anthropic token counting:** No client-side tokenizer. Options: (a) call `POST /v1/messages/count_tokens` (round-trip cost), (b) ship a heuristic approximator. **Recommend (a)** for budget enforcement only; skip pre-count for cost attribution (use provider response).
6. **Streaming dedup:** Spec offers v1 as "non-streaming only OR replay chunk-by-chunk." **Recommend non-streaming only** in v1; chunk replay is significant engineering for marginal upside.
7. **Quality complaint threshold:** Spec hardcodes 2% auto-disable. Confirm acceptable or make per-rule configurable (recommend per-rule, default 2%).

## 6. Definition of done — v1 launch checklist

From `spec.md` §Success Criteria, restated as a checklist:

- [ ] New customer can sign up, add a provider key, get a codemesh API key, and route their first request in under 5 minutes
- [ ] Routed requests add <50ms p50 latency overhead at the gateway
- [ ] Streaming responses pass through with no perceptible quality degradation
- [ ] Cache-control automation produces measurable, attributable savings on a real coding-agent workload within 24h of integration
- [ ] Dashboard MTD spend accurate within ±2% of provider's actual bill (verified against real customer invoice)
- [ ] Three paying design partners using the product daily and renewing into month 2
