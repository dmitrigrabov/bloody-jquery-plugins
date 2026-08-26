import { getEmailsMetricsResponse } from "packages/models/src/getEmailsMetricsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsMetricsArgs = {
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

export const getApiEmailsMetricsQueryOptions = (args: UseGetApiEmailsMetricsArgs) =>
  queryOptions({
    queryKey: [
      "GET /emails/metrics",
      "Emails",
      args.start_date,
      args.end_date,
      args.timezone,
      args.granularity,
      args.metrics,
      args.dimensions,
      args.domain_id,
      args.email_id,
      args.broadcast_id,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails/metrics", {
          start_date: args.start_date,
          end_date: args.end_date,
          timezone: args.timezone,
          granularity: args.granularity,
          metrics: args.metrics,
          dimensions: args.dimensions,
          domain_id: args.domain_id,
          email_id: args.email_id,
          broadcast_id: args.broadcast_id,
        }),
        getEmailsMetricsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiEmailsMetrics = (args: UseGetApiEmailsMetricsArgs) =>
  useQuery(getApiEmailsMetricsQueryOptions(args));
