import { listBroadcastsResponseSuccess } from "packages/models/src/listBroadcastsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiBroadcastsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiBroadcastsQueryOptions = (args: UseGetApiBroadcastsArgs) =>
  queryOptions({
    queryKey: ["GET /broadcasts", "Broadcasts", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/broadcasts", { limit: args.limit, after: args.after, before: args.before }),
        listBroadcastsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiBroadcasts = (args: UseGetApiBroadcastsArgs) =>
  useQuery(getApiBroadcastsQueryOptions(args));
