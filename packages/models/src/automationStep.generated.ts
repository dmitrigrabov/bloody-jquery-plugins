import { z } from "zod";

export type AutomationStep = {
  key: string;
  type:
    | "trigger"
    | "send_email"
    | "delay"
    | "wait_for_event"
    | "condition"
    | "contact_update"
    | "contact_delete"
    | "add_to_segment";
  config: Record<string, never>;
};

export const automationStep = z.object({
  key: z.string(),
  type: z.enum([
    "trigger",
    "send_email",
    "delay",
    "wait_for_event",
    "condition",
    "contact_update",
    "contact_delete",
    "add_to_segment",
  ]),
  config: z.object({}),
});
