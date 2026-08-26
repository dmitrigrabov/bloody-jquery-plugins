import {
  type AutomationStepResponse,
  automationStepResponse,
} from "packages/models/src/automationStepResponse.generated.ts";
import {
  type AutomationConnection,
  automationConnection,
} from "packages/models/src/automationConnection.generated.ts";
import { z } from "zod";

export type Automation = {
  object?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  status?: ("enabled" | "disabled") | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  steps?: Array<AutomationStepResponse> | undefined;
  connections?: Array<AutomationConnection> | undefined;
};

export const automation = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  steps: z.array(automationStepResponse).optional(),
  connections: z.array(automationConnection).optional(),
});
