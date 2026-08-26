import { z } from "zod";

export type WebhookEventBounce = {
  diagnosticCode: Array<string>;
  message: string;
  subType:
    | "Undetermined"
    | "General"
    | "NoEmail"
    | "MailboxFull"
    | "MessageTooLarge"
    | "ContentRejected"
    | "AttachmentRejected";
  type: "Undetermined" | "Transient" | "Permanent";
};

export const webhookEventBounce = z.object({
  diagnosticCode: z.array(z.string()),
  message: z.string(),
  subType: z.enum([
    "Undetermined",
    "General",
    "NoEmail",
    "MailboxFull",
    "MessageTooLarge",
    "ContentRejected",
    "AttachmentRejected",
  ]),
  type: z.enum(["Undetermined", "Transient", "Permanent"]),
});
