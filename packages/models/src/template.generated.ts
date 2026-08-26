import {
  type TemplateVariable,
  templateVariable,
} from "packages/models/src/templateVariable.generated.ts";
import { z } from "zod";

export type Template = {
  object?: string | undefined;
  id?: string | undefined;
  current_version_id?: string | undefined;
  name?: string | undefined;
  alias?: string | undefined;
  from?: string | undefined;
  subject?: string | undefined;
  reply_to?: (Array<string> | null) | undefined;
  html?: string | undefined;
  text?: string | undefined;
  variables?: Array<TemplateVariable> | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  status?: ("draft" | "published") | undefined;
  published_at?: (string | null) | undefined;
  has_unpublished_versions?: boolean | undefined;
};

export const template = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  current_version_id: z.string().optional(),
  name: z.string().optional(),
  alias: z.string().optional(),
  from: z.string().optional(),
  subject: z.string().optional(),
  reply_to: z.array(z.string()).nullable().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  variables: z.array(templateVariable).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
  published_at: z.string().nullable().optional(),
  has_unpublished_versions: z.boolean().optional(),
});
