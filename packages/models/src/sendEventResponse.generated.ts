import { z } from "zod";

export type SendEventResponse = { object?: string | undefined; event?: string | undefined };

export const sendEventResponse = z.object({
  object: z.string().optional(),
  event: z.string().optional(),
});
