import { type Email, email } from "packages/models/src/email.generated.ts";
import { z } from "zod";

export type ListEmailsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<Email> | undefined;
};

export const listEmailsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(email).optional(),
});
