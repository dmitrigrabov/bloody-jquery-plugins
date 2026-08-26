import { z } from "zod";

export type CreateSegmentOptions = {
  name: string;
  audience_id?: string | undefined;
  filter?: Record<string, never> | undefined;
};

export const createSegmentOptions = z.object({
  name: z.string(),
  audience_id: z.string().optional(),
  filter: z.object({}).optional(),
});
