import { z } from "zod";

export type BatchRemoveSuppressionsOptions = {
  emails?: Array<string> | undefined;
  ids?: Array<string> | undefined;
};

export const batchRemoveSuppressionsOptions = z.object({
  emails: z.array(z.string()).optional(),
  ids: z.array(z.string()).optional(),
});
