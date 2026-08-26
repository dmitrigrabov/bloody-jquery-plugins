import { z } from "zod";

export type GetTopicResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  default_subscription?: ("opt_in" | "opt_out") | undefined;
  visibility?: ("public" | "private") | undefined;
  created_at?: string | undefined;
};

export const getTopicResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  default_subscription: z.enum(["opt_in", "opt_out"]).optional(),
  visibility: z.enum(["public", "private"]).optional(),
  created_at: z.string().optional(),
});
