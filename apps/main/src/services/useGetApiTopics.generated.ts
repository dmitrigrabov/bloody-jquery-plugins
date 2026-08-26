import { listTopicsResponseSuccess } from "packages/models/src/listTopicsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiTopicsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiTopicsQueryOptions = (args: UseGetApiTopicsArgs) =>
  queryOptions({
    queryKey: ["GET /topics", "Topics", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/topics", { limit: args.limit, after: args.after, before: args.before }),
        listTopicsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiTopics = (args: UseGetApiTopicsArgs) =>
  useQuery(getApiTopicsQueryOptions(args));
