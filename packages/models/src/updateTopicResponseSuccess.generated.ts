import { z } from "zod";

export type UpdateTopicResponseSuccess = { id?: string | undefined; object?: string | undefined };

export const updateTopicResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
