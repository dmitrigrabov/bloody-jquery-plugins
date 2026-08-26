import { z } from "zod";

export type UpdateEventResponse = { object?: string | undefined; id?: string | undefined };

export const updateEventResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
