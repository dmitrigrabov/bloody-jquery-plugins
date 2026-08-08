import { z } from "zod";

export type ErrorResponse = { code: string; message?: string | undefined };

export const errorResponse = z.object({ code: z.string(), message: z.string().optional() });
