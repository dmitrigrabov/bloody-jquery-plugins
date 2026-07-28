import { z } from "zod";

export type WebhookDomainRecord = {
  record: "SPF" | "DKIM" | "Receiving MX" | "Tracking" | "TrackingCAA";
  name: string;
  value: string;
  type: "MX" | "TXT" | "CNAME" | "CAA";
  ttl: string;
  status: "pending" | "verified" | "failed" | "temporary_failure" | "not_started";
  priority?: number | undefined;
};

export const webhookDomainRecord = z.object({
  record: z.enum(["SPF", "DKIM", "Receiving MX", "Tracking", "TrackingCAA"]),
  name: z.string(),
  value: z.string(),
  type: z.enum(["MX", "TXT", "CNAME", "CAA"]),
  ttl: z.string(),
  status: z.enum(["pending", "verified", "failed", "temporary_failure", "not_started"]),
  priority: z.number().int().optional(),
});
