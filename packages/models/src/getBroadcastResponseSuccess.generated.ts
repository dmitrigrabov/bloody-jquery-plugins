import { z } from "zod";

export type GetBroadcastResponseSuccess = {
  id?: string | undefined;
  name?: string | undefined;
  audience_id?: (string | null) | undefined;
  segment_id?: (string | null) | undefined;
  from?: string | undefined;
  subject?: string | undefined;
  reply_to?: Array<string> | undefined;
  preview_text?: string | undefined;
  status?: string | undefined;
  created_at?: string | undefined;
  scheduled_at?: string | undefined;
  sent_at?: string | undefined;
  text?: (string | null) | undefined;
  html?: (string | null) | undefined;
  topic_id?: (string | null) | undefined;
};

export const getBroadcastResponseSuccess = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  audience_id: z.string().nullable().optional(),
  segment_id: z.string().nullable().optional(),
  from: z.string().optional(),
  subject: z.string().optional(),
  reply_to: z.array(z.string()).optional(),
  preview_text: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  scheduled_at: z.string().optional(),
  sent_at: z.string().optional(),
  text: z.string().nullable().optional(),
  html: z.string().nullable().optional(),
  topic_id: z.string().nullable().optional(),
});
