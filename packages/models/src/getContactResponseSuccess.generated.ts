import { z } from "zod";

export type GetContactResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
  email?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  created_at?: string | undefined;
  unsubscribed?: boolean | undefined;
  properties?: Record<string, unknown> | undefined;
};

export const getContactResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  created_at: z.string().optional(),
  unsubscribed: z.boolean().optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});
