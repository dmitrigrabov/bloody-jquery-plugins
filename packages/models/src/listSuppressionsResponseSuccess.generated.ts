import { z } from "zod";

export type ListSuppressionsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        email?: string | undefined;
        origin?: ("bounce" | "complaint" | "manual") | undefined;
        source_id?: (string | null) | undefined;
        created_at?: string | undefined;
      }>
    | undefined;
};

export const listSuppressionsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        email: z.string().optional(),
        origin: z.enum(["bounce", "complaint", "manual"]).optional(),
        source_id: z.string().nullable().optional(),
        created_at: z.string().optional(),
      }),
    )
    .optional(),
});
