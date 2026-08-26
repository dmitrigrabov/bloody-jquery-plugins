import {
  type TemplateVariableInput,
  templateVariableInput,
} from "packages/models/src/templateVariableInput.generated.ts";
import { z } from "zod";

export type UpdateTemplateOptions = {
  name?: string | undefined;
  alias?: string | undefined;
  from?: string | undefined;
  subject?: string | undefined;
  reply_to?: Array<string> | undefined;
  html?: string | undefined;
  text?: string | undefined;
  variables?: Array<TemplateVariableInput> | undefined;
};

export const updateTemplateOptions = z.object({
  name: z.string().optional(),
  alias: z.string().optional(),
  from: z.string().optional(),
  subject: z.string().optional(),
  reply_to: z.array(z.string()).optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  variables: z.array(templateVariableInput).optional(),
});
