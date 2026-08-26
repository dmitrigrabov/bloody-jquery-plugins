import { z } from "zod";

export type ListBroadcastRecipientsResponseSuccess = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?:
    | Array<{
        id?: string | undefined;
        contact_id?: (string | null) | undefined;
        email?: string | undefined;
        count?: number | undefined;
        bounce_type?: ("permanent" | "transient" | "undetermined") | undefined;
        clicked_links?:
          | Array<{ url?: string | undefined; clicks?: number | undefined }>
          | undefined;
      }>
    | undefined;
};

export const listBroadcastRecipientsResponseSuccess = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z
    .array(
      z.object({
        id: z.string().optional(),
        contact_id: z.string().nullable().optional(),
        email: z.string().optional(),
        count: z.number().int().optional(),
        bounce_type: z.enum(["permanent", "transient", "undetermined"]).optional(),
        clicked_links: z
          .array(z.object({ url: z.string().optional(), clicks: z.number().int().optional() }))
          .optional(),
      }),
    )
    .optional(),
});
