import { z } from "zod";

export type UpdateEventRequest = { schema: Record<string, never> | null };

export const updateEventRequest = z.object({ schema: z.object({}).nullable() });
