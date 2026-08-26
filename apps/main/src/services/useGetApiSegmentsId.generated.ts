import { getSegmentResponseSuccess } from "packages/models/src/getSegmentResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiSegmentsIdArgs = { id: string };

export const getApiSegmentsIdQueryOptions = (args: UseGetApiSegmentsIdArgs) =>
  queryOptions({
    queryKey: ["GET /segments/{id}", "Segments", args.id],
    queryFn: () =>
      apiFetch(buildUrl("/segments/{id}", { id: args.id }), getSegmentResponseSuccess, {
        method: "GET",
      }),
  });

export const useGetApiSegmentsId = (args: UseGetApiSegmentsIdArgs) =>
  useQuery(getApiSegmentsIdQueryOptions(args));
