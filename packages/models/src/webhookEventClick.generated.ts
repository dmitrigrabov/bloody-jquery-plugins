import { z } from "zod";

export type WebhookEventClick = {
  ipAddress: string;
  link: string;
  timestamp: string;
  userAgent: string;
};

export const webhookEventClick = z.object({
  ipAddress: z.string(),
  link: z.string(),
  timestamp: z.string(),
  userAgent: z.string(),
});
