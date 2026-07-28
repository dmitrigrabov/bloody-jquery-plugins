import { type EventSummary, eventSummary } from "packages/models/src/eventSummary.generated.ts";
import { z } from "zod";

export type ListEventsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<EventSummary> | undefined;
};

export const listEventsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(eventSummary).optional(),
});
