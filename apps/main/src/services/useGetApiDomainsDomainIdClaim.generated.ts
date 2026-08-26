import { domainClaim } from "packages/models/src/domainClaim.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiDomainsDomainIdClaimArgs = { domain_id: string };

export const getApiDomainsDomainIdClaimQueryOptions = (args: UseGetApiDomainsDomainIdClaimArgs) =>
  queryOptions({
    queryKey: ["GET /domains/{domain_id}/claim", "Domains", args.domain_id],
    queryFn: () =>
      apiFetch(buildUrl("/domains/{domain_id}/claim", { domain_id: args.domain_id }), domainClaim, {
        method: "GET",
      }),
  });

export const useGetApiDomainsDomainIdClaim = (args: UseGetApiDomainsDomainIdClaimArgs) =>
  useQuery(getApiDomainsDomainIdClaimQueryOptions(args));
