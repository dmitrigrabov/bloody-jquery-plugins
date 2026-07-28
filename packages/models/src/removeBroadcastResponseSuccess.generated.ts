import { z } from "zod";

export type RemoveBroadcastResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeBroadcastResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  deleted: z.boolean().optional(),
});
