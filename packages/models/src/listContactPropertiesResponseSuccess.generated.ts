import { z } from "zod";

export type ListContactPropertiesResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        key?: string | undefined;
        type?: string | undefined;
        fallback_value?: (string | number) | undefined;
        created_at?: string | undefined;
      }>
    | undefined;
};

export const listContactPropertiesResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        key: z.string().optional(),
        type: z.string().optional(),
        fallback_value: z.union([z.string(), z.number()]).optional(),
        created_at: z.string().optional(),
      }),
    )
    .optional(),
});
