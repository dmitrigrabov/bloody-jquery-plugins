import { z } from "zod";

export type ListBroadcastClickedLinksResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        url?: string | undefined;
        clicks?: number | undefined;
        unique_clicks?: number | undefined;
      }>
    | undefined;
};

export const listBroadcastClickedLinksResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        clicks: z.number().int().optional(),
        unique_clicks: z.number().int().optional(),
      }),
    )
    .optional(),
});
