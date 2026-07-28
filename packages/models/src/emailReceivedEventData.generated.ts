import {
  type WebhookEventAttachment,
  webhookEventAttachment,
} from "packages/models/src/webhookEventAttachment.generated.ts";
import { z } from "zod";

export type EmailReceivedEventData = {
  email_id: string;
  created_at: string;
  from: string;
  to: Array<string>;
  subject: string;
  message_id: string;
  bcc: Array<string>;
  cc: Array<string>;
  attachments: Array<WebhookEventAttachment>;
};

export const emailReceivedEventData = z.object({
  email_id: z.string(),
  created_at: z.string(),
  from: z.string(),
  to: z.array(z.string()),
  subject: z.string(),
  message_id: z.string(),
  bcc: z.array(z.string()),
  cc: z.array(z.string()),
  attachments: z.array(webhookEventAttachment),
});
