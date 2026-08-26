import { z } from "zod";

export type RemoveAudienceResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeAudienceResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  deleted: z.boolean().optional(),
});
