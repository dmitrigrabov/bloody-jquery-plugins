import { z } from "zod";

export type AddContactToSegmentResponseSuccess = {
  object?: string | undefined;
  contact_id?: string | undefined;
  segment_id?: string | undefined;
};

export const addContactToSegmentResponseSuccess = z.object({
  object: z.string().optional(),
  contact_id: z.string().optional(),
  segment_id: z.string().optional(),
});
