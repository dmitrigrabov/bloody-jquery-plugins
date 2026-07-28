import { z } from "zod";

export type RevokeOAuthGrantResponse = {
  object?: string | undefined;
  id?: string | undefined;
  revoked_at?: string | undefined;
  revoked_reason?: string | undefined;
};

export const revokeOAuthGrantResponse = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  revoked_at: z.string().optional(),
  revoked_reason: z.string().optional(),
});
