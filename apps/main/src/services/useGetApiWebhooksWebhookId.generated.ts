import { getWebhookResponse } from "packages/models/src/getWebhookResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiWebhooksWebhookIdArgs = { webhook_id: string };

export const getApiWebhooksWebhookIdQueryOptions = (args: UseGetApiWebhooksWebhookIdArgs) =>
  queryOptions({
    queryKey: ["GET /webhooks/{webhook_id}", "Webhooks", args.webhook_id],
    queryFn: () =>
      apiFetch(
        buildUrl("/webhooks/{webhook_id}", { webhook_id: args.webhook_id }),
        getWebhookResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiWebhooksWebhookId = (args: UseGetApiWebhooksWebhookIdArgs) =>
  useQuery(getApiWebhooksWebhookIdQueryOptions(args));
