import { z } from "zod";

export type StopAutomationResponse = {
  object?: string | undefined;
  id?: string | undefined;
  status?: string | undefined;
};

export const stopAutomationResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  status: z.string().optional(),
});
