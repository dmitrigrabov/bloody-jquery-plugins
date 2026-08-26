import { listDomainsResponse } from "packages/models/src/listDomainsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiDomainsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiDomainsQueryOptions = (args: UseGetApiDomainsArgs) =>
  queryOptions({
    queryKey: ["GET /domains", "Domains", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/domains", { limit: args.limit, after: args.after, before: args.before }),
        listDomainsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiDomains = (args: UseGetApiDomainsArgs) =>
  useQuery(getApiDomainsQueryOptions(args));
