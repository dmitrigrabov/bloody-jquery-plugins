import { getReceivedEmailResponse } from "packages/models/src/getReceivedEmailResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsReceivingEmailIdArgs = { email_id: string };

export const getApiEmailsReceivingEmailIdQueryOptions = (
  args: UseGetApiEmailsReceivingEmailIdArgs,
) =>
  queryOptions({
    queryKey: ["GET /emails/receiving/{email_id}", "Receiving Emails", args.email_id],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails/receiving/{email_id}", { email_id: args.email_id }),
        getReceivedEmailResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiEmailsReceivingEmailId = (args: UseGetApiEmailsReceivingEmailIdArgs) =>
  useQuery(getApiEmailsReceivingEmailIdQueryOptions(args));
