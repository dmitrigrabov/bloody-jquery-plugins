import { z } from "zod";

export type CreateAutomationResponse = { object?: string | undefined; id?: string | undefined };

export const createAutomationResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
