import {
  type TemplateListItem,
  templateListItem,
} from "packages/models/src/templateListItem.generated.ts";
import { z } from "zod";

export type ListTemplatesResponseSuccess = {
  object?: string | undefined;
  data?: Array<TemplateListItem> | undefined;
  has_more?: boolean | undefined;
};

export const listTemplatesResponseSuccess = z.object({
  object: z.string().optional(),
  data: z.array(templateListItem).optional(),
  has_more: z.boolean().optional(),
});
