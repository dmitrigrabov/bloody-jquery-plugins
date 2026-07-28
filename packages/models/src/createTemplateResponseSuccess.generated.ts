import { z } from "zod";

export type CreateTemplateResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const createTemplateResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
