import { z } from "zod";

export type TemplateVariable = {
  id?: string | undefined;
  key: string;
  type: "string" | "number" | "boolean" | "object" | "list";
  fallback_value?: (string | number | boolean | Record<string, never> | Array<unknown>) | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
};

export const templateVariable = z.object({
  id: z.string().optional(),
  key: z.string(),
  type: z.enum(["string", "number", "boolean", "object", "list"]),
  fallback_value: z
    .union([z.string(), z.number(), z.boolean(), z.object({}), z.array(z.unknown())])
    .optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
