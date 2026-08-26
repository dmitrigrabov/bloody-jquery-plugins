import { z } from "zod";

export type CreateEventResponse = { object?: string | undefined; id?: string | undefined };

export const createEventResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
