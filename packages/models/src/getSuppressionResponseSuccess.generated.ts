import { z } from "zod";

export type GetSuppressionResponseSuccess = {
  object?: string | undefined;
  id?: string | undefined;
  email?: string | undefined;
  origin?: ("bounce" | "complaint" | "manual") | undefined;
  source_id?: (string | null) | undefined;
  created_at?: string | undefined;
};

export const getSuppressionResponseSuccess = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  email: z.string().optional(),
  origin: z.enum(["bounce", "complaint", "manual"]).optional(),
  source_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
});
