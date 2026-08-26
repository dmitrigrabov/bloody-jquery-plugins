import {
  type AutomationStep,
  automationStep,
} from "packages/models/src/automationStep.generated.ts";
import {
  type AutomationConnection,
  automationConnection,
} from "packages/models/src/automationConnection.generated.ts";
import { z } from "zod";

export type PatchAutomationRequest = {
  name?: string | undefined;
  status?: ("enabled" | "disabled") | undefined;
  steps?: Array<AutomationStep> | undefined;
  connections?: Array<AutomationConnection> | undefined;
};

export const patchAutomationRequest = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
  steps: z.array(automationStep).optional(),
  connections: z.array(automationConnection).optional(),
});
