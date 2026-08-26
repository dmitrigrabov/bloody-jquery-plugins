import { z } from "zod";

export type LogSummary = {
  id?: string | undefined;
  created_at?: string | undefined;
  endpoint?: string | undefined;
  method?: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS") | undefined;
  response_status?: number | undefined;
  user_agent?: (string | null) | undefined;
};

export const logSummary = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  endpoint: z.string().optional(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]).optional(),
  response_status: z.number().int().optional(),
  user_agent: z.string().nullable().optional(),
});
