import { z } from "zod";

export type DeleteWebhookResponse = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const deleteWebhookResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
