import { z } from "zod";

export type UpdateContactResponseSuccess = { object?: string | undefined; id?: string | undefined };

export const updateContactResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
