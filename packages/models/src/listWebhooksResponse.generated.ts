import { z } from "zod";

export type ListWebhooksResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        endpoint?: string | undefined;
        events?: (Array<string> | null) | undefined;
        status?: string | undefined;
        created_at?: string | undefined;
      }>
    | undefined;
};

export const listWebhooksResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        endpoint: z.string().optional(),
        events: z.array(z.string()).nullable().optional(),
        status: z.string().optional(),
        created_at: z.string().optional(),
      }),
    )
    .optional(),
});
