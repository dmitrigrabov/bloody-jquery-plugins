import { getBroadcastResponseSuccess } from "packages/models/src/getBroadcastResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiBroadcastsIdArgs = { id: string };

export const getApiBroadcastsIdQueryOptions = (args: UseGetApiBroadcastsIdArgs) =>
  queryOptions({
    queryKey: ["GET /broadcasts/{id}", "Broadcasts", args.id],
    queryFn: () =>
      apiFetch(buildUrl("/broadcasts/{id}", { id: args.id }), getBroadcastResponseSuccess, {
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

export const useGetApiBroadcastsId = (args: UseGetApiBroadcastsIdArgs) =>
  useQuery(getApiBroadcastsIdQueryOptions(args));
