import { z } from "zod";

export type BatchAddSuppressionsResponseSuccess = {
  data?: Array<{ object?: string | undefined; id?: string | undefined }> | undefined;
};

export const batchAddSuppressionsResponseSuccess = z.object({
  data: z.array(z.object({ object: z.string().optional(), id: z.string().optional() })).optional(),
});
