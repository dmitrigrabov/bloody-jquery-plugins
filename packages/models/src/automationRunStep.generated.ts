import { z } from "zod";

export type AutomationRunStep = {
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
  status?: string | undefined;
  started_at?: (string | null) | undefined;
  completed_at?: (string | null) | undefined;
  output?: (Record<string, never> | null) | undefined;
  error?: (Record<string, never> | null) | undefined;
  created_at?: string | undefined;
};

export const automationRunStep = z.object({
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
  status: z.string().optional(),
  started_at: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
  output: z.object({}).nullable().optional(),
  error: z.object({}).nullable().optional(),
  created_at: z.string().optional(),
});
