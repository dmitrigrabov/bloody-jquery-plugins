import { z } from "zod";

export type AutomationListItem = {
  id?: string | undefined;
  name?: string | undefined;
  status?: ("enabled" | "disabled") | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
};

export const automationListItem = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
