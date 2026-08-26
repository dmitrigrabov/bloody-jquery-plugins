import { z } from "zod";

export type UpdateSegmentResponseSuccess = { id?: string | undefined; object?: string | undefined };

export const updateSegmentResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
