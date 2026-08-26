import { z } from "zod";

export type CreateTopicOptions = {
  name: string;
  default_subscription: "opt_in" | "opt_out";
  description?: string | undefined;
  visibility?: ("public" | "private") | undefined;
};

export const createTopicOptions = z.object({
  name: z.string().max(50),
  default_subscription: z.enum(["opt_in", "opt_out"]),
  description: z.string().max(200).optional(),
  visibility: z.enum(["public", "private"]).optional(),
});
