import { z } from "zod";

export type GetContactPropertyResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
  key?: string | undefined;
  type?: string | undefined;
  fallback_value?: (string | number) | undefined;
  created_at?: string | undefined;
};

export const getContactPropertyResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  type: z.string().optional(),
  fallback_value: z.union([z.string(), z.number()]).optional(),
  created_at: z.string().optional(),
});
