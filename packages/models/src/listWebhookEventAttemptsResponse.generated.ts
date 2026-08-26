import { z } from "zod";

export type ListWebhookEventAttemptsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        http_status_code?: number | undefined;
        response?: string | undefined;
        sent_at?: string | undefined;
      }>
    | undefined;
};

export const listWebhookEventAttemptsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        http_status_code: z.number().int().optional(),
        response: z.string().optional(),
        sent_at: z.string().optional(),
      }),
    )
    .optional(),
});
