import { z } from "zod";

export type CreateBroadcastOptions = {
  name?: string | undefined;
  segment_id: string;
  audience_id?: string | undefined;
  from: string;
  subject: string;
  reply_to?: Array<string> | undefined;
  preview_text?: string | undefined;
  html?: string | undefined;
  text?: string | undefined;
  topic_id?: string | undefined;
  send?: boolean | undefined;
  scheduled_at?: string | undefined;
};

export const createBroadcastOptions = z.object({
  name: z.string().optional(),
  segment_id: z.string(),
  audience_id: z.string().optional(),
  from: z.string(),
  subject: z.string(),
  reply_to: z.array(z.string()).optional(),
  preview_text: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  topic_id: z.string().optional(),
  send: z.boolean().optional(),
  scheduled_at: z.string().optional(),
});
