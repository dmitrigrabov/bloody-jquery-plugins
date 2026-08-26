import { z } from "zod";

export type ListContactsResponseSuccess = {
  object?: string | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        email?: string | undefined;
        first_name?: (string | null) | undefined;
        last_name?: (string | null) | undefined;
        created_at?: string | undefined;
        unsubscribed?: boolean | undefined;
      }>
    | undefined;
};

export const listContactsResponseSuccess = z.object({
  object: z.string().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        email: z.string().optional(),
        first_name: z.string().nullable().optional(),
        last_name: z.string().nullable().optional(),
        created_at: z.string().optional(),
        unsubscribed: z.boolean().optional(),
      }),
    )
    .optional(),
});
