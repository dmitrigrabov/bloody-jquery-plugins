import { z } from "zod";

export type CreateAudienceOptions = { name: string };

export const createAudienceOptions = z.object({ name: z.string() });
