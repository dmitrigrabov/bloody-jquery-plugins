import { z } from "zod";

export type CreateSegmentResponseSuccess = { id?: string | undefined; object?: string | undefined };

export const createSegmentResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
