import { z } from "zod";

export type EmailTemplateInput = {
  id: string;
  variables?: Record<string, string | number> | undefined;
};

export const emailTemplateInput = z.object({
  id: z.string(),
  variables: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});
