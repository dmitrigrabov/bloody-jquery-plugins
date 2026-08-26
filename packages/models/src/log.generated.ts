import { z } from "zod";

export type Log = {
  object?: string | undefined;
  id?: string | undefined;
  created_at?: string | undefined;
  endpoint?: string | undefined;
  method?: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS") | undefined;
  response_status?: number | undefined;
  user_agent?: (string | null) | undefined;
  request_body?: (Record<string, never> | null) | undefined;
  response_body?: (Record<string, never> | null) | undefined;
};

export const log = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  created_at: z.string().optional(),
  endpoint: z.string().optional(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]).optional(),
  response_status: z.number().int().optional(),
  user_agent: z.string().nullable().optional(),
  request_body: z.object({}).nullable().optional(),
  response_body: z.object({}).nullable().optional(),
});
