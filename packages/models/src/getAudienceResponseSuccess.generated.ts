import { z } from "zod";

export type GetAudienceResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  name?: string | undefined;
  created_at?: string | undefined;
};

export const getAudienceResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
});
