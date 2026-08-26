import { z } from "zod";

export type RemoveTopicResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeTopicResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  deleted: z.boolean().optional(),
});
