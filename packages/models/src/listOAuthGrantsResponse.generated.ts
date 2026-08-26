import { type OAuthGrant, oAuthGrant } from "packages/models/src/oAuthGrant.generated.ts";
import { z } from "zod";

export type ListOAuthGrantsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<OAuthGrant> | undefined;
};

export const listOAuthGrantsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(oAuthGrant).optional(),
});
