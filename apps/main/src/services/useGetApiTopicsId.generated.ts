import { getTopicResponseSuccess } from "packages/models/src/getTopicResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiTopicsIdArgs = { id: string };

export const getApiTopicsIdQueryOptions = (args: UseGetApiTopicsIdArgs) =>
  queryOptions({
    queryKey: ["GET /topics/{id}", "Topics", args.id],
    queryFn: () =>
      apiFetch(buildUrl("/topics/{id}", { id: args.id }), getTopicResponseSuccess, {
        method: "GET",
      }),
  });

export const useGetApiTopicsId = (args: UseGetApiTopicsIdArgs) =>
  useQuery(getApiTopicsIdQueryOptions(args));
