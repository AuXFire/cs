CREATE TYPE "public"."routing_action" AS ENUM('route_to_cheaper', 'block', 'alert');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cache_prefixes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"prefix_hash" text NOT NULL,
	"token_count" integer NOT NULL,
	"first_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"hit_count" integer DEFAULT 0 NOT NULL,
	"cache_control_inserted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dedup_cache" (
	"request_hash" text PRIMARY KEY NOT NULL,
	"tenant_id" uuid NOT NULL,
	"response_body" jsonb NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routing_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"match_team" text,
	"match_feature" text,
	"match_model" text,
	"action" "routing_action" NOT NULL,
	"target_model" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spend_buckets" (
	"tenant_id" uuid NOT NULL,
	"hour" timestamp with time zone NOT NULL,
	"team" text DEFAULT '' NOT NULL,
	"feature" text DEFAULT '' NOT NULL,
	"provider" "provider" NOT NULL,
	"model" text NOT NULL,
	"request_count" integer DEFAULT 0 NOT NULL,
	"input_tokens" bigint DEFAULT 0 NOT NULL,
	"output_tokens" bigint DEFAULT 0 NOT NULL,
	"cached_input_tokens" bigint DEFAULT 0 NOT NULL,
	"cost_usd_micros" bigint DEFAULT 0 NOT NULL,
	"savings_usd_micros" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "spend_buckets_tenant_id_hour_team_feature_provider_model_pk" PRIMARY KEY("tenant_id","hour","team","feature","provider","model")
);
--> statement-breakpoint
ALTER TABLE "request_logs" ADD COLUMN "rolled_up_at" timestamp with time zone;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cache_prefixes" ADD CONSTRAINT "cache_prefixes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dedup_cache" ADD CONSTRAINT "dedup_cache_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routing_rules" ADD CONSTRAINT "routing_rules_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spend_buckets" ADD CONSTRAINT "spend_buckets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cache_prefixes_tenant_prefix_idx" ON "cache_prefixes" USING btree ("tenant_id","prefix_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "routing_rules_tenant_idx" ON "routing_rules" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spend_buckets_tenant_hour_idx" ON "spend_buckets" USING btree ("tenant_id","hour");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "request_logs_unrolled_idx" ON "request_logs" USING btree ("created_at") WHERE "request_logs"."rolled_up_at" IS NULL;