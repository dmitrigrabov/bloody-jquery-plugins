import { z } from "zod";

export type ListWebhookEventsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        type?: string | undefined;
        created_at?: string | undefined;
        status?: ("pending" | "attempting" | "success" | "failed") | undefined;
      }>
    | undefined;
};

export const listWebhookEventsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        type: z.string().optional(),
        created_at: z.string().optional(),
        status: z.enum(["pending", "attempting", "success", "failed"]).optional(),
      }),
    )
    .optional(),
});
