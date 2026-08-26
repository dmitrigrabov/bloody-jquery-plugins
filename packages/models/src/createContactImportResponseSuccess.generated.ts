import { z } from "zod";

export type CreateContactImportResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
};

export const createContactImportResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
