import {
  type DomainEventData,
  domainEventData,
} from "packages/models/src/domainEventData.generated.ts";
import { z } from "zod";

export type DomainUpdatedEvent = {
  type: "domain.updated";
  created_at: string;
  data: DomainEventData;
};

export const domainUpdatedEvent = z.object({
  type: z.literal("domain.updated"),
  created_at: z.string(),
  data: domainEventData,
});
