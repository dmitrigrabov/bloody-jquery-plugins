import { listEmailsResponse } from "packages/models/src/listEmailsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiEmailsQueryOptions = (args: UseGetApiEmailsArgs) =>
  queryOptions({
    queryKey: ["GET /emails", "Emails", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails", { limit: args.limit, after: args.after, before: args.before }),
        listEmailsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiEmails = (args: UseGetApiEmailsArgs) =>
  useQuery(getApiEmailsQueryOptions(args));
