import { z } from "zod";

export type UpdateContactOptions = {
  email?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  unsubscribed?: boolean | undefined;
  properties?: Record<string, unknown> | undefined;
};

export const updateContactOptions = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  unsubscribed: z.boolean().optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});
