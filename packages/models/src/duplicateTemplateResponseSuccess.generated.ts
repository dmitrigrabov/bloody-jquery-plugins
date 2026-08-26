import { z } from "zod";

export type DuplicateTemplateResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const duplicateTemplateResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
