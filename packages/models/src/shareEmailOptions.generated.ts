import { z } from "zod";

export type ShareEmailOptions = { expires_in?: string | undefined };

export const shareEmailOptions = z.object({ expires_in: z.string().optional() });
