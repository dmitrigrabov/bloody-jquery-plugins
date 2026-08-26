import { z } from "zod";

export type CreateApiKeyRequest = {
  name: string;
  permission?: ("full_access" | "sending_access") | undefined;
  domain_id?: string | undefined;
};

export const createApiKeyRequest = z.object({
  name: z.string(),
  permission: z.enum(["full_access", "sending_access"]).optional(),
  domain_id: z.string().optional(),
});
