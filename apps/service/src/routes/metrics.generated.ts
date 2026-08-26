import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { getEmailsMetrics } from "./handlers/metrics";
import type { GetEmailsMetricsResponse } from "packages/models/src/getEmailsMetricsResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/emails/metrics",
  validate(
    "query",
    z.object({
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      timezone: z.string().optional(),
      granularity: z.enum(["hourly", "daily", "weekly", "monthly"]).optional(),
      metrics: z
        .array(
          z.enum([
            "received",
            "delivered",
            "complained",
            "suppressed",
            "bounced",
            "bounced_transient",
            "bounced_permanent",
            "bounced_undetermined",
            "opened",
            "clicked",
            "unsubscribed",
            "delivery_delayed",
            "failed",
            "sent",
            "unique_opened",
            "unique_clicked",
            "delivery_rate",
            "open_rate",
            "click_rate",
            "bounce_rate",
            "complaint_rate",
            "unsubscribe_rate",
          ]),
        )
        .optional(),
      dimensions: z.array(z.enum(["period", "domain", "email", "broadcast"])).optional(),
      domain_id: z.array(z.string()).optional(),
      email_id: z.array(z.string()).optional(),
      broadcast_id: z.array(z.string()).optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getEmailsMetrics({ db, env: c.env, user: c.var.user, query }));
  },
);

export type GetEmailsMetricsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    start_date?: string | undefined;
    end_date?: string | undefined;
    timezone?: string | undefined;
    granularity?: ("hourly" | "daily" | "weekly" | "monthly") | undefined;
    metrics?:
      | Array<
          | "received"
          | "delivered"
          | "complained"
          | "suppressed"
          | "bounced"
          | "bounced_transient"
          | "bounced_permanent"
          | "bounced_undetermined"
          | "opened"
          | "clicked"
          | "unsubscribed"
          | "delivery_delayed"
          | "failed"
          | "sent"
          | "unique_opened"
          | "unique_clicked"
          | "delivery_rate"
          | "open_rate"
          | "click_rate"
          | "bounce_rate"
          | "complaint_rate"
          | "unsubscribe_rate"
        >
      | undefined;
    dimensions?: Array<"period" | "domain" | "email" | "broadcast"> | undefined;
    domain_id?: Array<string> | undefined;
    email_id?: Array<string> | undefined;
    broadcast_id?: Array<string> | undefined;
  };
};

export type GetEmailsMetricsHandler = (
  input: GetEmailsMetricsInput,
) => Promise<GetEmailsMetricsResponse>;
