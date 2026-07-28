import { z } from "zod";

export type ListTopicsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        default_subscription?: ("opt_in" | "opt_out") | undefined;
        visibility?: ("public" | "private") | undefined;
        created_at?: string | undefined;
      }>
    | undefined;
};

export const listTopicsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        default_subscription: z.enum(["opt_in", "opt_out"]).optional(),
        visibility: z.enum(["public", "private"]).optional(),
        created_at: z.string().optional(),
      }),
    )
    .optional(),
});
