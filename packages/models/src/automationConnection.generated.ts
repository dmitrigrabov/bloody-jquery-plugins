import { z } from "zod";

export type AutomationConnection = {
  from: string;
  to: string;
  type?:
    | ("default" | "condition_met" | "condition_not_met" | "timeout" | "event_received")
    | undefined;
};

export const automationConnection = z.object({
  from: z.string(),
  to: z.string(),
  type: z
    .enum(["default", "condition_met", "condition_not_met", "timeout", "event_received"])
    .optional(),
});
