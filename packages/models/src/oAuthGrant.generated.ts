import { z } from "zod";

export type OAuthGrant = {
  id?: string | undefined;
  client_id?: string | undefined;
  scopes?: Array<string> | undefined;
  created_at?: string | undefined;
  revoked_at?: (string | null) | undefined;
  revoked_reason?: (string | null) | undefined;
  client?: { name?: string | undefined; logo_uri?: (string | null) | undefined } | undefined;
};

export const oAuthGrant = z.object({
  id: z.string().optional(),
  client_id: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  revoked_at: z.string().nullable().optional(),
  revoked_reason: z.string().nullable().optional(),
  client: z
    .object({ name: z.string().optional(), logo_uri: z.string().nullable().optional() })
    .optional(),
});
