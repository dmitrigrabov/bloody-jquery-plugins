import { z } from "zod";

export type CreateContactOptions = {
  email: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
  unsubscribed?: boolean | undefined;
  properties?: Record<string, unknown> | undefined;
  segments?: Array<string> | undefined;
  topics?:
    | Array<{ id?: string | undefined; subscription?: ("opt_in" | "opt_out") | undefined }>
    | undefined;
  audience_id?: string | undefined;
};

export const createContactOptions = z.object({
  email: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  unsubscribed: z.boolean().optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
  segments: z.array(z.string()).optional(),
  topics: z
    .array(
      z.object({
        id: z.string().optional(),
        subscription: z.enum(["opt_in", "opt_out"]).optional(),
      }),
    )
    .optional(),
  audience_id: z.string().optional(),
});
