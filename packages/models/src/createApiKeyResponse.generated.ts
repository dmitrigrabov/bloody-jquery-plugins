import { z } from "zod";

export type CreateApiKeyResponse = { id?: string | undefined; token?: string | undefined };

export const createApiKeyResponse = z.object({
  id: z.string().optional(),
  token: z.string().optional(),
});
