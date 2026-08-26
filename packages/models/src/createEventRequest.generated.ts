import { z } from "zod";

export type CreateEventRequest = {
  name: string;
  schema?: (Record<string, never> | null) | undefined;
};

export const createEventRequest = z.object({
  name: z.string(),
  schema: z.object({}).nullable().optional(),
});
