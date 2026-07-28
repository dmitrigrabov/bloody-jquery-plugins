import { z } from "zod";

export type CreateAudienceResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  name?: string | undefined;
};

export const createAudienceResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  name: z.string().optional(),
});
