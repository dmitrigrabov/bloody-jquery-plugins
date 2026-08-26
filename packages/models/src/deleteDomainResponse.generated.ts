import { z } from "zod";

export type DeleteDomainResponse = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const deleteDomainResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
