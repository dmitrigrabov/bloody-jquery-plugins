import { z } from "zod";

export type DomainRecord = {
  record?: ("SPF" | "DKIM" | "Receiving" | "Tracking" | "TrackingCAA") | undefined;
  name?: string | undefined;
  type?: ("MX" | "TXT" | "CNAME" | "CAA") | undefined;
  ttl?: string | undefined;
  status?: ("pending" | "verified" | "failed" | "temporary_failure" | "not_started") | undefined;
  value?: string | undefined;
  priority?: number | undefined;
};

export const domainRecord = z.object({
  record: z.enum(["SPF", "DKIM", "Receiving", "Tracking", "TrackingCAA"]).optional(),
  name: z.string().optional(),
  type: z.enum(["MX", "TXT", "CNAME", "CAA"]).optional(),
  ttl: z.string().optional(),
  status: z.enum(["pending", "verified", "failed", "temporary_failure", "not_started"]).optional(),
  value: z.string().optional(),
  priority: z.number().int().optional(),
});
