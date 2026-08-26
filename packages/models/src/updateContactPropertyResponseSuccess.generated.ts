import { z } from "zod";

export type UpdateContactPropertyResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const updateContactPropertyResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
