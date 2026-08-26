import { z } from "zod";

export type CreateSuppressionResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
};

export const createSuppressionResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
