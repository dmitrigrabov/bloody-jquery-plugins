import { listReceivedEmailsResponse } from "packages/models/src/listReceivedEmailsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsReceivingArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiEmailsReceivingQueryOptions = (args: UseGetApiEmailsReceivingArgs) =>
  queryOptions({
    queryKey: ["GET /emails/receiving", "Receiving Emails", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails/receiving", {
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listReceivedEmailsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiEmailsReceiving = (args: UseGetApiEmailsReceivingArgs) =>
  useQuery(getApiEmailsReceivingQueryOptions(args));
