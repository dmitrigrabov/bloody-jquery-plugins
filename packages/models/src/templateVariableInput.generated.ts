import { z } from "zod";

export type TemplateVariableInput = {
  key: string;
  type: "string" | "number" | "boolean" | "object" | "list";
  fallback_value?: (string | number | boolean | Record<string, never> | Array<unknown>) | undefined;
};

export const templateVariableInput = z.object({
  key: z.string(),
  type: z.enum(["string", "number", "boolean", "object", "list"]),
  fallback_value: z
    .union([z.string(), z.number(), z.boolean(), z.object({}), z.array(z.unknown())])
    .optional(),
});
