import { z } from "zod";

export type WebhookEventSuppressed = {
  diagnosticCode: Array<string>;
  message: string;
  reason: "previous_bounce" | "previous_complaint";
  type: "Suppressed" | "OnAccountSuppressionList";
};

export const webhookEventSuppressed = z.object({
  diagnosticCode: z.array(z.string()),
  message: z.string(),
  reason: z.enum(["previous_bounce", "previous_complaint"]),
  type: z.enum(["Suppressed", "OnAccountSuppressionList"]),
});
