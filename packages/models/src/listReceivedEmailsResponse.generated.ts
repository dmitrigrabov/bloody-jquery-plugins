import { z } from "zod";

export type ListReceivedEmailsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        to?: Array<string> | undefined;
        from?: string | undefined;
        subject?: (string | null) | undefined;
        message_id?: string | undefined;
        bcc?: (Array<string> | null) | undefined;
        cc?: (Array<string> | null) | undefined;
        reply_to?: (Array<string> | null) | undefined;
        created_at?: string | undefined;
        attachments?:
          | Array<{
              id?: string | undefined;
              filename?: (string | null) | undefined;
              content_type?: string | undefined;
              content_id?: string | undefined;
              content_disposition?: ("inline" | "attachment" | null) | undefined;
              size?: number | undefined;
            }>
          | undefined;
      }>
    | undefined;
};

export const listReceivedEmailsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        to: z.array(z.string()).optional(),
        from: z.string().optional(),
        subject: z.string().nullable().optional(),
        message_id: z.string().optional(),
        bcc: z.array(z.string()).nullable().optional(),
        cc: z.array(z.string()).nullable().optional(),
        reply_to: z.array(z.string()).nullable().optional(),
        created_at: z.string().optional(),
        attachments: z
          .array(
            z.object({
              id: z.string().optional(),
              filename: z.string().nullable().optional(),
              content_type: z.string().optional(),
              content_id: z.string().optional(),
              content_disposition: z.enum(["inline", "attachment"]).nullable().optional(),
              size: z.number().int().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});
