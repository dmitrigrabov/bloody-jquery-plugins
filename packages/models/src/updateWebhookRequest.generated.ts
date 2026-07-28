import { z } from "zod";

export type UpdateWebhookRequest = {
  endpoint?: string | undefined;
  events?: Array<string> | undefined;
  status?: ("enabled" | "disabled") | undefined;
};

export const updateWebhookRequest = z.object({
  endpoint: z.string().optional(),
  events: z.array(z.string()).optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
});
