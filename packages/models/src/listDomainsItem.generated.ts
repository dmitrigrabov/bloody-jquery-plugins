import {
  type DomainCapabilities,
  domainCapabilities,
} from "packages/models/src/domainCapabilities.generated.ts";
import { z } from "zod";

export type ListDomainsItem = {
  id?: string | undefined;
  name?: string | undefined;
  status?:
    | (
        | "pending"
        | "verified"
        | "failed"
        | "not_started"
        | "partially_verified"
        | "partially_failed"
      )
    | undefined;
  created_at?: string | undefined;
  region?: string | undefined;
  open_tracking?: boolean | undefined;
  click_tracking?: boolean | undefined;
  capabilities?: DomainCapabilities | undefined;
};

export const listDomainsItem = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z
    .enum([
      "pending",
      "verified",
      "failed",
      "not_started",
      "partially_verified",
      "partially_failed",
    ])
    .optional(),
  created_at: z.string().optional(),
  region: z.string().optional(),
  open_tracking: z.boolean().optional(),
  click_tracking: z.boolean().optional(),
  capabilities: domainCapabilities.optional(),
});
