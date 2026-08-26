import { z } from "zod";

export type UpdateSegmentOptions = { name: string };

export const updateSegmentOptions = z.object({ name: z.string() });
