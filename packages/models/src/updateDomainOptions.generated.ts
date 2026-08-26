import {
  type DomainCapabilities,
  domainCapabilities,
} from "packages/models/src/domainCapabilities.generated.ts";
import { z } from "zod";

export type UpdateDomainOptions = {
  open_tracking?: boolean | undefined;
  click_tracking?: boolean | undefined;
  tls?: string | undefined;
  capabilities?: DomainCapabilities | undefined;
  tracking_subdomain?: string | undefined;
};

export const updateDomainOptions = z.object({
  open_tracking: z.boolean().optional(),
  click_tracking: z.boolean().optional(),
  tls: z.string().optional(),
  capabilities: domainCapabilities.optional(),
  tracking_subdomain: z.string().optional(),
});
