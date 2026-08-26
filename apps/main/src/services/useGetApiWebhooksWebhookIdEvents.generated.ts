import { listWebhookEventsResponse } from "packages/models/src/listWebhookEventsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiWebhooksWebhookIdEventsArgs = {
  webhook_id: string;
  limit?: number | undefined;
  after?: string | undefined;
};

export const getApiWebhooksWebhookIdEventsQueryOptions = (
  args: UseGetApiWebhooksWebhookIdEventsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /webhooks/{webhook_id}/events",
      "Webhooks",
      args.webhook_id,
      args.limit,
      args.after,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/webhooks/{webhook_id}/events", {
          webhook_id: args.webhook_id,
          limit: args.limit,
          after: args.after,
        }),
        listWebhookEventsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiWebhooksWebhookIdEvents = (args: UseGetApiWebhooksWebhookIdEventsArgs) =>
  useQuery(getApiWebhooksWebhookIdEventsQueryOptions(args));
