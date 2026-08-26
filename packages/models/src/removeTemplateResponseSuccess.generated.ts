import { z } from "zod";

export type RemoveTemplateResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeTemplateResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
