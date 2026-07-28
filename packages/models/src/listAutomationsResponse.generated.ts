import {
  type AutomationListItem,
  automationListItem,
} from "packages/models/src/automationListItem.generated.ts";
import { z } from "zod";

export type ListAutomationsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<AutomationListItem> | undefined;
};

export const listAutomationsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(automationListItem).optional(),
});
