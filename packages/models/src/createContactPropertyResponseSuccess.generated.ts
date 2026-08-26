import { z } from "zod";

export type CreateContactPropertyResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const createContactPropertyResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
