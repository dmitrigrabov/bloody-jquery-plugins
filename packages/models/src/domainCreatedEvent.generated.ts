import {
  type DomainEventData,
  domainEventData,
} from "packages/models/src/domainEventData.generated.ts";
import { z } from "zod";

export type DomainCreatedEvent = {
  type: "domain.created";
  created_at: string;
  data: DomainEventData;
};

export const domainCreatedEvent = z.object({
  type: z.literal("domain.created"),
  created_at: z.string(),
  data: domainEventData,
});
