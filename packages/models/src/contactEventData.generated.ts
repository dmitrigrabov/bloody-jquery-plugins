import { z } from "zod";

export type ContactEventData = {
  id: string;
  audience_id?: string | undefined;
  segment_ids?: Array<string> | undefined;
  created_at: string;
  updated_at: string;
  email: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
  unsubscribed: boolean;
};

export const contactEventData = z.object({
  id: z.string(),
  audience_id: z.string().optional(),
  segment_ids: z.array(z.string()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
  email: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  unsubscribed: z.boolean(),
});
