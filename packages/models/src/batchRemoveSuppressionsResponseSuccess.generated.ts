import { z } from "zod";

export type BatchRemoveSuppressionsResponseSuccess = {
  data?:
    | Array<{ object?: string | undefined; id?: string | undefined; deleted?: boolean | undefined }>
    | undefined;
};

export const batchRemoveSuppressionsResponseSuccess = z.object({
  data: z
    .array(
      z.object({
        object: z.string().optional(),
        id: z.string().optional(),
        deleted: z.boolean().optional(),
      }),
    )
    .optional(),
});
