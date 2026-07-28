import { z } from "zod";

export type CreateContactResponseSuccess = { object?: string | undefined; id?: string | undefined };

export const createContactResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
