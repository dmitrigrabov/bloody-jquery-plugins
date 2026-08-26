import { listWebhooksResponse } from "packages/models/src/listWebhooksResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiWebhooksArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiWebhooksQueryOptions = (args: UseGetApiWebhooksArgs) =>
  queryOptions({
    queryKey: ["GET /webhooks", "Webhooks", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/webhooks", { limit: args.limit, after: args.after, before: args.before }),
        listWebhooksResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiWebhooks = (args: UseGetApiWebhooksArgs) =>
  useQuery(getApiWebhooksQueryOptions(args));
