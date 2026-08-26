import { z } from "zod";

export type CreateContactPropertyOptions = {
  key: string;
  type: "string" | "number";
  fallback_value?: (string | number) | undefined;
};

export const createContactPropertyOptions = z.object({
  key: z.string(),
  type: z.enum(["string", "number"]),
  fallback_value: z.union([z.string(), z.number()]).optional(),
});
