import { z } from "zod";

export type CreateBroadcastResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const createBroadcastResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
