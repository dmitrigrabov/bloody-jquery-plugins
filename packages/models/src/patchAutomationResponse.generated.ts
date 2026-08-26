import { z } from "zod";

export type PatchAutomationResponse = { object?: string | undefined; id?: string | undefined };

export const patchAutomationResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
});
