import { z } from "zod";

export type GetContactTopicsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        subscription?: ("opt_in" | "opt_out") | undefined;
      }>
    | undefined;
};

export const getContactTopicsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        subscription: z.enum(["opt_in", "opt_out"]).optional(),
      }),
    )
    .optional(),
});
