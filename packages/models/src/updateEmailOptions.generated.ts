import { z } from "zod";

export type UpdateEmailOptions = { scheduled_at?: string | undefined };

export const updateEmailOptions = z.object({ scheduled_at: z.string().optional() });
