import { z } from "zod";

export type TemplateListItem = {
  id?: string | undefined;
  name?: string | undefined;
  status?: ("draft" | "published") | undefined;
  published_at?: (string | null) | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  alias?: string | undefined;
};

export const templateListItem = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
  published_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  alias: z.string().optional(),
});
