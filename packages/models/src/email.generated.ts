import { z } from "zod";

export type Email = {
  object?: string | undefined;
  id?: string | undefined;
  message_id?: string | undefined;
  to?: Array<string> | undefined;
  from?: string | undefined;
  created_at?: string | undefined;
  subject?: string | undefined;
  html?: string | undefined;
  text?: string | undefined;
  bcc?: Array<string> | undefined;
  cc?: Array<string> | undefined;
  reply_to?: Array<string> | undefined;
  last_event?:
    | (
        | "bounced"
        | "canceled"
        | "clicked"
        | "complained"
        | "delivered"
        | "delivery_delayed"
        | "failed"
        | "opened"
        | "queued"
        | "scheduled"
        | "sent"
        | "suppressed"
      )
    | undefined;
  bounce?:
    | {
        message?: (string | null) | undefined;
        type?: ("Undetermined" | "Transient" | "Permanent" | "null" | null) | undefined;
        subType?:
          | (
              | "Undetermined"
              | "General"
              | "NoEmail"
              | "MailboxFull"
              | "MessageTooLarge"
              | "ContentRejected"
              | "AttachmentRejected"
              | "null"
              | null
            )
          | undefined;
        diagnosticCode?: Array<string> | undefined;
      }
    | undefined;
};

export const email = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  message_id: z.string().optional(),
  to: z.array(z.string()).optional(),
  from: z.string().optional(),
  created_at: z.string().optional(),
  subject: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  bcc: z.array(z.string()).optional(),
  cc: z.array(z.string()).optional(),
  reply_to: z.array(z.string()).optional(),
  last_event: z
    .enum([
      "bounced",
      "canceled",
      "clicked",
      "complained",
      "delivered",
      "delivery_delayed",
      "failed",
      "opened",
      "queued",
      "scheduled",
      "sent",
      "suppressed",
    ])
    .optional(),
  bounce: z
    .object({
      message: z.string().nullable().optional(),
      type: z.enum(["Undetermined", "Transient", "Permanent", "null"]).nullable().optional(),
      subType: z
        .enum([
          "Undetermined",
          "General",
          "NoEmail",
          "MailboxFull",
          "MessageTooLarge",
          "ContentRejected",
          "AttachmentRejected",
          "null",
        ])
        .nullable()
        .optional(),
      diagnosticCode: z.array(z.string()).optional(),
    })
    .optional(),
});
