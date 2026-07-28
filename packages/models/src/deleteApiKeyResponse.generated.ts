import { z } from "zod";

export type DeleteApiKeyResponse = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const deleteApiKeyResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
