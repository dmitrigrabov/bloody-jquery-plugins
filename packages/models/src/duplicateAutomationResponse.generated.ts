import { z } from "zod";

export type DuplicateAutomationResponse = { object?: string | undefined; id?: string | undefined };

export const duplicateAutomationResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
