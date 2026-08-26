import { z } from "zod";

export type ApiKey = {
  id?: string | undefined;
  name?: string | undefined;
  created_at?: string | undefined;
  last_used_at?: (string | null) | undefined;
};

export const apiKey = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
  last_used_at: z.string().nullable().optional(),
});
