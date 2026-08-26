import { z } from "zod";

export type RetrievedAttachment = {
  object?: string | undefined;
  id?: string | undefined;
  filename?: (string | null) | undefined;
  content_type?: string | undefined;
  content_id?: string | undefined;
  content_disposition?: ("inline" | "attachment" | null) | undefined;
  download_url?: string | undefined;
  expires_at?: string | undefined;
  size?: number | undefined;
};

export const retrievedAttachment = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  filename: z.string().nullable().optional(),
  content_type: z.string().optional(),
  content_id: z.string().optional(),
  content_disposition: z.enum(["inline", "attachment"]).nullable().optional(),
  download_url: z.string().optional(),
  expires_at: z.string().optional(),
  size: z.number().int().optional(),
});
