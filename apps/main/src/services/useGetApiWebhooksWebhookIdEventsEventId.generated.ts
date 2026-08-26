import { getWebhookEventResponse } from "packages/models/src/getWebhookEventResponse.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiWebhooksWebhookIdEventsEventIdArgs = { webhook_id: string; event_id: string };

export const getApiWebhooksWebhookIdEventsEventIdQueryOptions = (
  args: UseGetApiWebhooksWebhookIdEventsEventIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /webhooks/{webhook_id}/events/{event_id}",
      "Webhooks",
      args.webhook_id,
      args.event_id,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/webhooks/{webhook_id}/events/{event_id}", {
          webhook_id: args.webhook_id,
          event_id: args.event_id,
        }),
        getWebhookEventResponse,
        { method: "GET" },
      ),
  });

export const useGetApiWebhooksWebhookIdEventsEventId = (
  args: UseGetApiWebhooksWebhookIdEventsEventIdArgs,
) => useQuery(getApiWebhooksWebhookIdEventsEventIdQueryOptions(args));
