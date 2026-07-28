import { z } from "zod";

export type VerifyDomainResponse = { object?: string | undefined; id?: string | undefined };

export const verifyDomainResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
