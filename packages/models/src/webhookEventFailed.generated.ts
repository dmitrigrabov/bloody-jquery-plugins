import { z } from "zod";

export type WebhookEventFailed = { reason: string };

export const webhookEventFailed = z.object({ reason: z.string() });
