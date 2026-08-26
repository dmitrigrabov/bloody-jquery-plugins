import { z } from "zod";

export type WebhookEventAttachment = {
  id: string;
  filename?: string | undefined;
  content_type?: string | undefined;
  content_disposition?: string | undefined;
  content_id?: string | undefined;
};

export const webhookEventAttachment = z.object({
  id: z.string(),
  filename: z.string().optional(),
  content_type: z.string().optional(),
  content_disposition: z.string().optional(),
  content_id: z.string().optional(),
});
