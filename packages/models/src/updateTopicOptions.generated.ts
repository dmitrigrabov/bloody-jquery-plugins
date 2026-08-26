import { z } from "zod";

export type UpdateTopicOptions = {
  name?: string | undefined;
  description?: string | undefined;
  visibility?: ("public" | "private") | undefined;
};

export const updateTopicOptions = z.object({
  name: z.string().max(50).optional(),
  description: z.string().max(200).optional(),
  visibility: z.enum(["public", "private"]).optional(),
});
