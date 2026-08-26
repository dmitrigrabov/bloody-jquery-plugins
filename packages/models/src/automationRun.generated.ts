import {
  type AutomationRunStep,
  automationRunStep,
} from "packages/models/src/automationRunStep.generated.ts";
import { z } from "zod";

export type AutomationRun = {
  object?: string | undefined;
  id?: string | undefined;
  status?: ("running" | "completed" | "failed" | "cancelled") | undefined;
  started_at?: (string | null) | undefined;
  completed_at?: (string | null) | undefined;
  created_at?: string | undefined;
  steps?: Array<AutomationRunStep> | undefined;
};

export const automationRun = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  status: z.enum(["running", "completed", "failed", "cancelled"]).optional(),
  started_at: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  steps: z.array(automationRunStep).optional(),
});
