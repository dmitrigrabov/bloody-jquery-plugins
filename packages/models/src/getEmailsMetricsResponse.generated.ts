import {
  type EmailMetricsDataRow,
  emailMetricsDataRow,
} from "packages/models/src/emailMetricsDataRow.generated.ts";
import { z } from "zod";

export type GetEmailsMetricsResponse = {
  object?: string | undefined;
  start_date?: string | undefined;
  end_date?: string | undefined;
  metrics?: Array<string> | undefined;
  dimensions?: Array<"period" | "domain" | "email" | "broadcast"> | undefined;
  granularity?: ("hourly" | "daily" | "weekly" | "monthly") | undefined;
  totals?: Record<string, number> | undefined;
  data?: Array<EmailMetricsDataRow> | undefined;
};

export const getEmailsMetricsResponse = z.object({
  object: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  metrics: z.array(z.string()).optional(),
  dimensions: z.array(z.enum(["period", "domain", "email", "broadcast"])).optional(),
  granularity: z.enum(["hourly", "daily", "weekly", "monthly"]).optional(),
  totals: z.record(z.string(), z.number()).optional(),
  data: z.array(emailMetricsDataRow).optional(),
});
