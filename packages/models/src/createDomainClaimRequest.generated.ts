import { z } from "zod";

export type CreateDomainClaimRequest = {
  name: string;
  region?: ("us-east-1" | "eu-west-1" | "sa-east-1" | "ap-northeast-1") | undefined;
  custom_return_path?: string | undefined;
  open_tracking?: boolean | undefined;
  click_tracking?: boolean | undefined;
  tracking_subdomain?: string | undefined;
};

export const createDomainClaimRequest = z.object({
  name: z.string(),
  region: z.enum(["us-east-1", "eu-west-1", "sa-east-1", "ap-northeast-1"]).optional(),
  custom_return_path: z.string().optional(),
  open_tracking: z.boolean().optional(),
  click_tracking: z.boolean().optional(),
  tracking_subdomain: z.string().optional(),
});
