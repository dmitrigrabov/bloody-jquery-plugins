import { z } from "zod";

export type GetWebhookEventResponse = {
  object?: string | undefined;
  id?: string | undefined;
  type?: string | undefined;
  created_at?: string | undefined;
  status?: ("pending" | "attempting" | "success" | "failed") | undefined;
  next_attempt_at?: (string | null) | undefined;
  payload?: Record<string, never> | undefined;
};

export const getWebhookEventResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  type: z.string().optional(),
  created_at: z.string().optional(),
  status: z.enum(["pending", "attempting", "success", "failed"]).optional(),
  next_attempt_at: z.string().nullable().optional(),
  payload: z.object({}).optional(),
});
