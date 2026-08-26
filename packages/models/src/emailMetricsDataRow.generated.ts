import { z } from "zod";

export type EmailMetricsDataRow =
  | {
      period?: string | undefined;
      domain_id?: string | undefined;
      domain_name?: string | undefined;
      email_id?: string | undefined;
      broadcast_id?: string | undefined;
      broadcast_name?: string | undefined;
    }
  | Record<string, number>;

export const emailMetricsDataRow = z
  .object({
    period: z.string().optional(),
    domain_id: z.string().optional(),
    domain_name: z.string().optional(),
    email_id: z.string().optional(),
    broadcast_id: z.string().optional(),
    broadcast_name: z.string().optional(),
  })
  .and(z.record(z.string(), z.number()));
