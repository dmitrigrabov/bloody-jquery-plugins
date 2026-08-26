import { listOAuthGrantsResponse } from "packages/models/src/listOAuthGrantsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiOauthGrantsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiOauthGrantsQueryOptions = (args: UseGetApiOauthGrantsArgs) =>
  queryOptions({
    queryKey: ["GET /oauth/grants", "OAuth", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/oauth/grants", { limit: args.limit, after: args.after, before: args.before }),
        listOAuthGrantsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiOauthGrants = (args: UseGetApiOauthGrantsArgs) =>
  useQuery(getApiOauthGrantsQueryOptions(args));
