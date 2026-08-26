import { getSuppressionResponseSuccess } from "packages/models/src/getSuppressionResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiSuppressionsSuppressionArgs = { suppression: string };

export const getApiSuppressionsSuppressionQueryOptions = (
  args: UseGetApiSuppressionsSuppressionArgs,
) =>
  queryOptions({
    queryKey: ["GET /suppressions/{suppression}", "Suppressions", args.suppression],
    queryFn: () =>
      apiFetch(
        buildUrl("/suppressions/{suppression}", { suppression: args.suppression }),
        getSuppressionResponseSuccess,
        { method: "GET" },
      ),
  });

export const useGetApiSuppressionsSuppression = (args: UseGetApiSuppressionsSuppressionArgs) =>
  useQuery(getApiSuppressionsSuppressionQueryOptions(args));
