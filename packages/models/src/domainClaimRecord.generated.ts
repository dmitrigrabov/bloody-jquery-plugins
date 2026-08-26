import { z } from "zod";

export type DomainClaimRecord = {
  type?: "TXT" | undefined;
  name?: string | undefined;
  value?: string | undefined;
  ttl?: string | undefined;
};

export const domainClaimRecord = z.object({
  type: z.literal("TXT").optional(),
  name: z.string().optional(),
  value: z.string().optional(),
  ttl: z.string().optional(),
});
