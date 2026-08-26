import { z } from "zod";

export type RemoveSuppressionResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeSuppressionResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
