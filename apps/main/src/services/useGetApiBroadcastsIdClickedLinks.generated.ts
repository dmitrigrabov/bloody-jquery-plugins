import { listBroadcastClickedLinksResponseSuccess } from "packages/models/src/listBroadcastClickedLinksResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiBroadcastsIdClickedLinksArgs = {
  id: string;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiBroadcastsIdClickedLinksQueryOptions = (
  args: UseGetApiBroadcastsIdClickedLinksArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /broadcasts/{id}/clicked-links",
      "Broadcasts",
      args.id,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/broadcasts/{id}/clicked-links", {
          id: args.id,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listBroadcastClickedLinksResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiBroadcastsIdClickedLinks = (args: UseGetApiBroadcastsIdClickedLinksArgs) =>
  useQuery(getApiBroadcastsIdClickedLinksQueryOptions(args));
