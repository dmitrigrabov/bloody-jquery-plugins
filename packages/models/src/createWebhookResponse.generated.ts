import { z } from "zod";

export type CreateWebhookResponse = {
  object?: string | undefined;
  id?: string | undefined;
  signing_secret?: string | undefined;
};

export const createWebhookResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  signing_secret: z.string().optional(),
});
