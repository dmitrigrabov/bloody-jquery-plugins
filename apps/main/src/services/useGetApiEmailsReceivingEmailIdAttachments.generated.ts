import { listAttachmentsResponse } from "packages/models/src/listAttachmentsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsReceivingEmailIdAttachmentsArgs = {
  email_id: string;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiEmailsReceivingEmailIdAttachmentsQueryOptions = (
  args: UseGetApiEmailsReceivingEmailIdAttachmentsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /emails/receiving/{email_id}/attachments",
      "Receiving Emails",
      args.email_id,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails/receiving/{email_id}/attachments", {
          email_id: args.email_id,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listAttachmentsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiEmailsReceivingEmailIdAttachments = (
  args: UseGetApiEmailsReceivingEmailIdAttachmentsArgs,
) => useQuery(getApiEmailsReceivingEmailIdAttachmentsQueryOptions(args));
