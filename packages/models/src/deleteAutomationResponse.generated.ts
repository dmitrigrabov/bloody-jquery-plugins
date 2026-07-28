import { z } from "zod";

export type DeleteAutomationResponse = {
  object?: string | undefined;
  id?: string | undefined;
  deleted?: boolean | undefined;
};

export const deleteAutomationResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  deleted: z.boolean().optional(),
});
