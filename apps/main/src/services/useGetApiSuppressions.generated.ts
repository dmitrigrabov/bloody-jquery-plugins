import { listSuppressionsResponseSuccess } from "packages/models/src/listSuppressionsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiSuppressionsArgs = {
  origin?: ("bounce" | "complaint" | "manual") | undefined;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiSuppressionsQueryOptions = (args: UseGetApiSuppressionsArgs) =>
  queryOptions({
    queryKey: [
      "GET /suppressions",
      "Suppressions",
      args.origin,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/suppressions", {
          origin: args.origin,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listSuppressionsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiSuppressions = (args: UseGetApiSuppressionsArgs) =>
  useQuery(getApiSuppressionsQueryOptions(args));
