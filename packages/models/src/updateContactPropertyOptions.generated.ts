import { z } from "zod";

export type UpdateContactPropertyOptions = { fallback_value?: (string | number) | undefined };

export const updateContactPropertyOptions = z.object({
  fallback_value: z.union([z.string(), z.number()]).optional(),
});
