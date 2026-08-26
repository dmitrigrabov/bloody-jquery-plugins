import { z } from "zod";

export type CreateWebhookRequest = { endpoint: string; events: Array<string> };

export const createWebhookRequest = z.object({ endpoint: z.string(), events: z.array(z.string()) });
