import { listApiKeysResponse } from "packages/models/src/listApiKeysResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiApiKeysArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiApiKeysQueryOptions = (args: UseGetApiApiKeysArgs) =>
  queryOptions({
    queryKey: ["GET /api-keys", "API Keys", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/api-keys", { limit: args.limit, after: args.after, before: args.before }),
        listApiKeysResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiApiKeys = (args: UseGetApiApiKeysArgs) =>
  useQuery(getApiApiKeysQueryOptions(args));
