import { z } from "zod";

export type ListAttachmentsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        filename?: (string | null) | undefined;
        content_type?: string | undefined;
        content_id?: string | undefined;
        content_disposition?: ("inline" | "attachment" | null) | undefined;
        download_url?: string | undefined;
        expires_at?: string | undefined;
        size?: number | undefined;
      }>
    | undefined;
};

export const listAttachmentsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        filename: z.string().nullable().optional(),
        content_type: z.string().optional(),
        content_id: z.string().optional(),
        content_disposition: z.enum(["inline", "attachment"]).nullable().optional(),
        download_url: z.string().optional(),
        expires_at: z.string().optional(),
        size: z.number().int().optional(),
      }),
    )
    .optional(),
});
