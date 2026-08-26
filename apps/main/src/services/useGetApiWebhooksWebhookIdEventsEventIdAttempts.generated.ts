import { listWebhookEventAttemptsResponse } from "packages/models/src/listWebhookEventAttemptsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiWebhooksWebhookIdEventsEventIdAttemptsArgs = {
  webhook_id: string;
  event_id: string;
  limit?: number | undefined;
  after?: string | undefined;
};

export const getApiWebhooksWebhookIdEventsEventIdAttemptsQueryOptions = (
  args: UseGetApiWebhooksWebhookIdEventsEventIdAttemptsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /webhooks/{webhook_id}/events/{event_id}/attempts",
      "Webhooks",
      args.webhook_id,
      args.event_id,
      args.limit,
      args.after,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/webhooks/{webhook_id}/events/{event_id}/attempts", {
          webhook_id: args.webhook_id,
          event_id: args.event_id,
          limit: args.limit,
          after: args.after,
        }),
        listWebhookEventAttemptsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiWebhooksWebhookIdEventsEventIdAttempts = (
  args: UseGetApiWebhooksWebhookIdEventsEventIdAttemptsArgs,
) => useQuery(getApiWebhooksWebhookIdEventsEventIdAttemptsQueryOptions(args));
