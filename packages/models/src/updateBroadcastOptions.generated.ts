import { z } from "zod";

export type UpdateBroadcastOptions = {
  name?: string | undefined;
  audience_id?: string | undefined;
  segment_id?: string | undefined;
  from?: string | undefined;
  subject?: string | undefined;
  reply_to?: Array<string> | undefined;
  preview_text?: string | undefined;
  html?: string | undefined;
  text?: string | undefined;
  topic_id?: string | undefined;
};

export const updateBroadcastOptions = z.object({
  name: z.string().optional(),
  audience_id: z.string().optional(),
  segment_id: z.string().optional(),
  from: z.string().optional(),
  subject: z.string().optional(),
  reply_to: z.array(z.string()).optional(),
  preview_text: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  topic_id: z.string().optional(),
});
