import {
  type AutomationRunListItem,
  automationRunListItem,
} from "packages/models/src/automationRunListItem.generated.ts";
import { z } from "zod";

export type ListAutomationRunsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<AutomationRunListItem> | undefined;
};

export const listAutomationRunsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(automationRunListItem).optional(),
});
