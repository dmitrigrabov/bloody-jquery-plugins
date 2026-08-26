import { z } from "zod";

export type UpdateContactTopicsOptions = {
  topics: Array<{ id?: string | undefined; subscription?: ("opt_in" | "opt_out") | undefined }>;
};

export const updateContactTopicsOptions = z.object({
  topics: z.array(
    z.object({ id: z.string().optional(), subscription: z.enum(["opt_in", "opt_out"]).optional() }),
  ),
});
