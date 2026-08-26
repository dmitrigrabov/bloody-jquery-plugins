import { retrievedAttachment } from "packages/models/src/retrievedAttachment.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsReceivingEmailIdAttachmentsAttachmentIdArgs = {
  email_id: string;
  attachment_id: string;
};

export const getApiEmailsReceivingEmailIdAttachmentsAttachmentIdQueryOptions = (
  args: UseGetApiEmailsReceivingEmailIdAttachmentsAttachmentIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /emails/receiving/{email_id}/attachments/{attachment_id}",
      "Receiving Emails",
      args.email_id,
      args.attachment_id,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails/receiving/{email_id}/attachments/{attachment_id}", {
          email_id: args.email_id,
          attachment_id: args.attachment_id,
        }),
        retrievedAttachment,
        { method: "GET" },
      ),
  });

export const useGetApiEmailsReceivingEmailIdAttachmentsAttachmentId = (
  args: UseGetApiEmailsReceivingEmailIdAttachmentsAttachmentIdArgs,
) => useQuery(getApiEmailsReceivingEmailIdAttachmentsAttachmentIdQueryOptions(args));
