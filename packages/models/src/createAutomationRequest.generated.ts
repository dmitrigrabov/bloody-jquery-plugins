import {
  type AutomationStep,
  automationStep,
} from "packages/models/src/automationStep.generated.ts";
import {
  type AutomationConnection,
  automationConnection,
} from "packages/models/src/automationConnection.generated.ts";
import { z } from "zod";

export type CreateAutomationRequest = {
  name: string;
  status?: ("enabled" | "disabled") | undefined;
  steps: Array<AutomationStep>;
  connections: Array<AutomationConnection>;
};

export const createAutomationRequest = z.object({
  name: z.string().min(1),
  status: z.enum(["enabled", "disabled"]).optional(),
  steps: z.array(automationStep),
  connections: z.array(automationConnection),
});
