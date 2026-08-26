import {
  type OutboundEmailEventData,
  outboundEmailEventData,
} from "packages/models/src/outboundEmailEventData.generated.ts";
import { z } from "zod";

export type EmailDeliveryDelayedEvent = {
  type: "email.delivery_delayed";
  created_at: string;
  data: OutboundEmailEventData;
};

export const emailDeliveryDelayedEvent = z.object({
  type: z.literal("email.delivery_delayed"),
  created_at: z.string(),
  data: outboundEmailEventData,
});
