import { z } from "zod";

export type ShareEmailResponse = {
  object?: string | undefined;
  id?: string | undefined;
  url?: string | undefined;
};

export const shareEmailResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  url: z.string().optional(),
});
