import { type ContactImport, contactImport } from "packages/models/src/contactImport.generated.ts";
import { z } from "zod";

export type ListContactImportsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<ContactImport> | undefined;
};

export const listContactImportsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(contactImport).optional(),
});
