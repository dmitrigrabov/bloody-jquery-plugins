import { z } from "zod";

export type GetSegmentResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  name?: string | undefined;
  audience_id?: string | undefined;
  filter?: Record<string, never> | undefined;
  created_at?: string | undefined;
};

export const getSegmentResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  name: z.string().optional(),
  audience_id: z.string().optional(),
  filter: z.object({}).optional(),
  created_at: z.string().optional(),
});
