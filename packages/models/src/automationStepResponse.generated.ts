import { z } from "zod";

export type AutomationStepResponse = {
  key?: string | undefined;
  type?:
    | (
        | "trigger"
        | "send_email"
        | "delay"
        | "wait_for_event"
        | "condition"
        | "contact_update"
        | "contact_delete"
        | "add_to_segment"
      )
    | undefined;
  config?: Record<string, never> | undefined;
};

export const automationStepResponse = z.object({
  key: z.string().optional(),
  type: z
    .enum([
      "trigger",
      "send_email",
      "delay",
      "wait_for_event",
      "condition",
      "contact_update",
      "contact_delete",
      "add_to_segment",
    ])
    .optional(),
  config: z.object({}).optional(),
});
