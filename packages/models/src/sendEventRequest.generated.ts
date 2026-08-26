import { z } from "zod";

export type SendEventRequest = {
  event: string;
  contact_id?: string | undefined;
  email?: string | undefined;
  payload?: Record<string, unknown> | undefined;
};

export const sendEventRequest = z.object({
  event: z.string(),
  contact_id: z.string().optional(),
  email: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});
