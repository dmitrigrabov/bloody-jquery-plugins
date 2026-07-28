import { z } from "zod";

export type RemoveContactResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeContactResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
