import {
  type TemplateVariableInput,
  templateVariableInput,
} from "packages/models/src/templateVariableInput.generated.ts";
import { z } from "zod";

export type CreateTemplateRequest = {
  name: string;
  alias?: string | undefined;
  from?: string | undefined;
  subject?: string | undefined;
  reply_to?: Array<string> | undefined;
  html: string;
  text?: string | undefined;
  variables?: Array<TemplateVariableInput> | undefined;
};

export const createTemplateRequest = z.object({
  name: z.string(),
  alias: z.string().optional(),
  from: z.string().optional(),
  subject: z.string().optional(),
  reply_to: z.array(z.string()).optional(),
  html: z.string(),
  text: z.string().optional(),
  variables: z.array(templateVariableInput).optional(),
});
