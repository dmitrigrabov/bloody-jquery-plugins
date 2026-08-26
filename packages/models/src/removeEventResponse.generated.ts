import { z } from "zod";

export type RemoveEventResponse = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeEventResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
