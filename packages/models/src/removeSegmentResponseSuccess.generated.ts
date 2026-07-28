import { z } from "zod";

export type RemoveSegmentResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeSegmentResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  deleted: z.boolean().optional(),
});
