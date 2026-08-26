import { z } from "zod";

export type CreateTopicResponseSuccess = { id?: string | undefined; object?: string | undefined };

export const createTopicResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
