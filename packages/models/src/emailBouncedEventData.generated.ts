import {
  type WebhookEventBounce,
  webhookEventBounce,
} from "packages/models/src/webhookEventBounce.generated.ts";
import { z } from "zod";

export type EmailBouncedEventData = {
  email_id: string;
  created_at: string;
  from: string;
  to: Array<string>;
  subject: string;
  broadcast_id?: string | undefined;
  template_id?: string | undefined;
  tags?: Record<string, string> | undefined;
  headers?: Array<{ name: string; value: string }> | undefined;
  bounce: WebhookEventBounce;
};

export const emailBouncedEventData = z.object({
  email_id: z.string(),
  created_at: z.string(),
  from: z.string(),
  to: z.array(z.string()),
  subject: z.string(),
  broadcast_id: z.string().optional(),
  template_id: z.string().optional(),
  tags: z.record(z.string(), z.string()).optional(),
  headers: z.array(z.object({ name: z.string(), value: z.string() })).optional(),
  bounce: webhookEventBounce,
});
