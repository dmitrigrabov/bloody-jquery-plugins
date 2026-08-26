import { z } from "zod";

export type BatchAddSuppressionsOptions = { emails: Array<string> };

export const batchAddSuppressionsOptions = z.object({ emails: z.array(z.string()) });
