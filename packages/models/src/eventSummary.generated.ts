import { z } from "zod";

export type EventSummary = {
  id?: string | undefined;
  name?: string | undefined;
  schema?: (Record<string, never> | null) | undefined;
  created_at?: string | undefined;
  updated_at?: (string | null) | undefined;
};

export const eventSummary = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  schema: z.object({}).nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});
