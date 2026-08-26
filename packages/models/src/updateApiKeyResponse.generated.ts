import { z } from "zod";

export type UpdateApiKeyResponse = { object?: string | undefined; id?: string | undefined };

export const updateApiKeyResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
