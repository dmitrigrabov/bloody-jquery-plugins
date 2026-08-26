import { z } from "zod";

export type GetWebhookResponse = {
  object?: string | undefined;
  id?: string | undefined;
  endpoint?: string | undefined;
  events?: (Array<string> | null) | undefined;
  status?: string | undefined;
  created_at?: string | undefined;
  signing_secret?: string | undefined;
};

export const getWebhookResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  endpoint: z.string().optional(),
  events: z.array(z.string()).nullable().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  signing_secret: z.string().optional(),
});
