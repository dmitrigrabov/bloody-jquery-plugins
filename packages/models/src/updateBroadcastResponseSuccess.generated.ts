import { z } from "zod";

export type UpdateBroadcastResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const updateBroadcastResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
