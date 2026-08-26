import { z } from "zod";

export type UpdateDomainResponseSuccess = { id?: string | undefined; object?: string | undefined };

export const updateDomainResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
