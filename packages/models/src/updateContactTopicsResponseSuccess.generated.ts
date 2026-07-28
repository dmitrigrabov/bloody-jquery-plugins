import { z } from "zod";

export type UpdateContactTopicsResponseSuccess = {
  object?: string | undefined;
  contact_id?: string | undefined;
  topics?:
    | Array<{ id?: string | undefined; subscription?: ("opt_in" | "opt_out") | undefined }>
    | undefined;
};

export const updateContactTopicsResponseSuccess = z.object({
  object: z.string().optional(),
  contact_id: z.string().optional(),
  topics: z
    .array(
      z.object({
        id: z.string().optional(),
        subscription: z.enum(["opt_in", "opt_out"]).optional(),
      }),
    )
    .optional(),
});
