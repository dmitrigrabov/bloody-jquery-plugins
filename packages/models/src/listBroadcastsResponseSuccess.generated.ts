import { z } from "zod";

export type ListBroadcastsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        name?: string | undefined;
        audience_id?: string | undefined;
        segment_id?: string | undefined;
        status?: string | undefined;
        created_at?: string | undefined;
        scheduled_at?: string | undefined;
        sent_at?: string | undefined;
        topic_id?: string | undefined;
      }>
    | undefined;
};

export const listBroadcastsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        audience_id: z.string().optional(),
        segment_id: z.string().optional(),
        status: z.string().optional(),
        created_at: z.string().optional(),
        scheduled_at: z.string().optional(),
        sent_at: z.string().optional(),
        topic_id: z.string().optional(),
      }),
    )
    .optional(),
});
