import { type Attachment, attachment } from "packages/models/src/attachment.generated.ts";
import { type Tag, tag } from "packages/models/src/tag.generated.ts";
import { z } from "zod";

export type SendEmailRequest = {
  from: string;
  to: string | Array<string>;
  subject: string;
  bcc?: (string | Array<string>) | undefined;
  cc?: (string | Array<string>) | undefined;
  reply_to?: (string | Array<string>) | undefined;
  html?: string | undefined;
  text?: string | undefined;
  template?: { id: string; variables?: Record<string, string | number> | undefined } | undefined;
  headers?: Record<string, never> | undefined;
  scheduled_at?: string | undefined;
  attachments?: Array<Attachment> | undefined;
  tags?: Array<Tag> | undefined;
  topic_id?: string | undefined;
};

export const sendEmailRequest = z.object({
  from: z.string(),
  to: z.union([z.string(), z.array(z.string())]),
  subject: z.string(),
  bcc: z.union([z.string(), z.array(z.string())]).optional(),
  cc: z.union([z.string(), z.array(z.string())]).optional(),
  reply_to: z.union([z.string(), z.array(z.string())]).optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  template: z
    .object({
      id: z.string(),
      variables: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
    })
    .optional(),
  headers: z.object({}).optional(),
  scheduled_at: z.string().optional(),
  attachments: z.array(attachment).optional(),
  tags: z.array(tag).optional(),
  topic_id: z.string().optional(),
});
