import { z } from "zod";

export type ListSegmentsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        name?: string | undefined;
        audience_id?: string | undefined;
        created_at?: string | undefined;
      }>
    | undefined;
};

export const listSegmentsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        audience_id: z.string().optional(),
        created_at: z.string().optional(),
      }),
    )
    .optional(),
});
