import {
  type DomainClaimRecord,
  domainClaimRecord,
} from "packages/models/src/domainClaimRecord.generated.ts";
import { z } from "zod";

export type DomainClaim = {
  object?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  status?:
    | (
        | "pending"
        | "verified"
        | "completed"
        | "blocked"
        | "expired"
        | "superseded"
        | "canceled"
        | "failed"
      )
    | undefined;
  domain_id?: (string | null) | undefined;
  region?: ("us-east-1" | "eu-west-1" | "sa-east-1" | "ap-northeast-1" | "null" | null) | undefined;
  record?: DomainClaimRecord | undefined;
  blocked_reason?:
    | ("grace_period" | "recent_owner_activity" | "pending_scheduled_emails" | "null" | null)
    | undefined;
  failure_reason?: (string | null) | undefined;
  created_at?: string | undefined;
  expires_at?: string | undefined;
};

export const domainClaim = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  status: z
    .enum([
      "pending",
      "verified",
      "completed",
      "blocked",
      "expired",
      "superseded",
      "canceled",
      "failed",
    ])
    .optional(),
  domain_id: z.string().nullable().optional(),
  region: z
    .enum(["us-east-1", "eu-west-1", "sa-east-1", "ap-northeast-1", "null"])
    .nullable()
    .optional(),
  record: domainClaimRecord.optional(),
  blocked_reason: z
    .enum(["grace_period", "recent_owner_activity", "pending_scheduled_emails", "null"])
    .nullable()
    .optional(),
  failure_reason: z.string().nullable().optional(),
  created_at: z.string().optional(),
  expires_at: z.string().optional(),
});
