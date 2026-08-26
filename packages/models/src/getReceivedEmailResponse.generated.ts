import { z } from "zod";

export type GetReceivedEmailResponse = {
  object?: string | undefined;
  id?: string | undefined;
  to?: Array<string> | undefined;
  from?: string | undefined;
  subject?: string | undefined;
  message_id?: string | undefined;
  bcc?: (Array<string> | null) | undefined;
  cc?: (Array<string> | null) | undefined;
  reply_to?: (Array<string> | null) | undefined;
  received_for?: Array<string> | undefined;
  html?: (string | null) | undefined;
  text?: (string | null) | undefined;
  headers?: (Record<string, never> | null) | undefined;
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
};

export const getReceivedEmailResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  to: z.array(z.string()).optional(),
  from: z.string().optional(),
  subject: z.string().optional(),
  message_id: z.string().optional(),
  bcc: z.array(z.string()).nullable().optional(),
  cc: z.array(z.string()).nullable().optional(),
  reply_to: z.array(z.string()).nullable().optional(),
  received_for: z.array(z.string()).optional(),
  html: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  headers: z.object({}).nullable().optional(),
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
});
