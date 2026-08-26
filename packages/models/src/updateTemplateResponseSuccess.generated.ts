import { z } from "zod";

export type UpdateTemplateResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const updateTemplateResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
