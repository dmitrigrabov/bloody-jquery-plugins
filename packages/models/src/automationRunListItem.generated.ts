import { z } from "zod";

export type AutomationRunListItem = {
  id?: string | undefined;
  status?: ("running" | "completed" | "failed" | "cancelled") | undefined;
  started_at?: (string | null) | undefined;
  completed_at?: (string | null) | undefined;
  created_at?: string | undefined;
};

export const automationRunListItem = z.object({
  id: z.string().optional(),
  status: z.enum(["running", "completed", "failed", "cancelled"]).optional(),
  started_at: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
});
