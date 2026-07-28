import { z } from "zod";

export type CreateSuppressionOptions = { email: string };

export const createSuppressionOptions = z.object({ email: z.string() });
