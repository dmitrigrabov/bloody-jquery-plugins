import { z } from "zod";

export type RemoveContactPropertyResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeContactPropertyResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  deleted: z.boolean().optional(),
});
