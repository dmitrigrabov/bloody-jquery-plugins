import {
  type ListDomainsItem,
  listDomainsItem,
} from "packages/models/src/listDomainsItem.generated.ts";
import { z } from "zod";

export type ListDomainsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<ListDomainsItem> | undefined;
};

export const listDomainsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(listDomainsItem).optional(),
});
