import { listSegmentsResponseSuccess } from "packages/models/src/listSegmentsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiSegmentsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiSegmentsQueryOptions = (args: UseGetApiSegmentsArgs) =>
  queryOptions({
    queryKey: ["GET /segments", "Segments", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/segments", { limit: args.limit, after: args.after, before: args.before }),
        listSegmentsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiSegments = (args: UseGetApiSegmentsArgs) =>
  useQuery(getApiSegmentsQueryOptions(args));
