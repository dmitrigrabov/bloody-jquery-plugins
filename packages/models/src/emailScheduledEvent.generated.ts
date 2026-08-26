import {
  type OutboundEmailEventData,
  outboundEmailEventData,
} from "packages/models/src/outboundEmailEventData.generated.ts";
import { z } from "zod";

export type EmailScheduledEvent = {
  type: "email.scheduled";
  created_at: string;
  data: OutboundEmailEventData;
};

export const emailScheduledEvent = z.object({
  type: z.literal("email.scheduled"),
  created_at: z.string(),
  data: outboundEmailEventData,
});
