import { z } from "zod";

export type RemoveContactFromSegmentResponseSuccess = {
  object?: string | undefined;
  contact_id?: string | undefined;
  segment_id?: string | undefined;
  deleted?: boolean | undefined;
};

export const removeContactFromSegmentResponseSuccess = z.object({
  object: z.string().optional(),
  contact_id: z.string().optional(),
  segment_id: z.string().optional(),
  deleted: z.boolean().optional(),
});
