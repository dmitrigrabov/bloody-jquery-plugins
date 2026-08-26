import { z } from "zod";

export type UpdateApiKeyRequest = { name: string };

export const updateApiKeyRequest = z.object({ name: z.string() });
