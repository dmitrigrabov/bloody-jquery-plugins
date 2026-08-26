import { z } from "zod";

export type UpdateWebhookResponse = { object?: string | undefined; id?: string | undefined };

export const updateWebhookResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
