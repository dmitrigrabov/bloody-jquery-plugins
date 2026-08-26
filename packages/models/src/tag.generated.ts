import { z } from "zod";

export type Tag = { name?: string | undefined; value?: string | undefined };

export const tag = z.object({ name: z.string().optional(), value: z.string().optional() });
