import {
  type DomainEventData,
  domainEventData,
} from "packages/models/src/domainEventData.generated.ts";
import { z } from "zod";

export type DomainDeletedEvent = {
  type: "domain.deleted";
  created_at: string;
  data: DomainEventData;
};

export const domainDeletedEvent = z.object({
  type: z.literal("domain.deleted"),
  created_at: z.string(),
  data: domainEventData,
});
