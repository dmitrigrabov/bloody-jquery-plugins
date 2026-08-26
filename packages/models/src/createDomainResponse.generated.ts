import {
  type DomainCapabilities,
  domainCapabilities,
} from "packages/models/src/domainCapabilities.generated.ts";
import { type DomainRecord, domainRecord } from "packages/models/src/domainRecord.generated.ts";
import { z } from "zod";

export type CreateDomainResponse = {
  id?: string | undefined;
  name?: string | undefined;
  created_at?: string | undefined;
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
  capabilities?: DomainCapabilities | undefined;
  records?: Array<DomainRecord> | undefined;
  region?: string | undefined;
  open_tracking?: boolean | undefined;
  click_tracking?: boolean | undefined;
  tracking_subdomain?: string | undefined;
};

export const createDomainResponse = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
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
  capabilities: domainCapabilities.optional(),
  records: z.array(domainRecord).optional(),
  region: z.string().optional(),
  open_tracking: z.boolean().optional(),
  click_tracking: z.boolean().optional(),
  tracking_subdomain: z.string().optional(),
});
