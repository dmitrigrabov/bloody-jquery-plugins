import { retrievedAttachment } from "packages/models/src/retrievedAttachment.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsEmailIdAttachmentsAttachmentIdArgs = {
  email_id: string;
  attachment_id: string;
};

export const getApiEmailsEmailIdAttachmentsAttachmentIdQueryOptions = (
  args: UseGetApiEmailsEmailIdAttachmentsAttachmentIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /emails/{email_id}/attachments/{attachment_id}",
      "Emails",
      args.email_id,
      args.attachment_id,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/emails/{email_id}/attachments/{attachment_id}", {
          email_id: args.email_id,
          attachment_id: args.attachment_id,
        }),
        retrievedAttachment,
        { method: "GET" },
      ),
  });

export const useGetApiEmailsEmailIdAttachmentsAttachmentId = (
  args: UseGetApiEmailsEmailIdAttachmentsAttachmentIdArgs,
) => useQuery(getApiEmailsEmailIdAttachmentsAttachmentIdQueryOptions(args));
