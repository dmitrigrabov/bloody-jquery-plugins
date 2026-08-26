import { type ApiKey, apiKey } from "packages/models/src/apiKey.generated.ts";
import { z } from "zod";

export type ListApiKeysResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<ApiKey> | undefined;
};

export const listApiKeysResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(apiKey).optional(),
});
