import { z } from "zod";

export type ListAudiencesResponseSuccess = {
  object?: string | undefined;
  data?:
    | Array<{ id?: string | undefined; name?: string | undefined; created_at?: string | undefined }>
    | undefined;
};

export const listAudiencesResponseSuccess = z.object({
  object: z.string().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        created_at: z.string().optional(),
      }),
    )
    .optional(),
});
