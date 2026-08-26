import { z } from "zod";

export type CancelBroadcastResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const cancelBroadcastResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
