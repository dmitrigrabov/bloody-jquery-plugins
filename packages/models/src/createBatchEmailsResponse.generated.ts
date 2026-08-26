import { z } from "zod";

export type CreateBatchEmailsResponse = { data?: Array<{ id?: string | undefined }> | undefined };

export const createBatchEmailsResponse = z.object({
  data: z.array(z.object({ id: z.string().optional() })).optional(),
});
