import { domain } from "packages/models/src/domain.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiDomainsDomainIdArgs = { domain_id: string };

export const getApiDomainsDomainIdQueryOptions = (args: UseGetApiDomainsDomainIdArgs) =>
  queryOptions({
    queryKey: ["GET /domains/{domain_id}", "Domains", args.domain_id],
    queryFn: () =>
      apiFetch(buildUrl("/domains/{domain_id}", { domain_id: args.domain_id }), domain, {
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

export const useGetApiDomainsDomainId = (args: UseGetApiDomainsDomainIdArgs) =>
  useQuery(getApiDomainsDomainIdQueryOptions(args));
