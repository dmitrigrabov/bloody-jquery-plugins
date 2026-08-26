import {
  type OutboundEmailEventData,
  outboundEmailEventData,
} from "packages/models/src/outboundEmailEventData.generated.ts";
import { z } from "zod";

export type EmailDeliveredEvent = {
  type: "email.delivered";
  created_at: string;
  data: OutboundEmailEventData;
};

export const emailDeliveredEvent = z.object({
  type: z.literal("email.delivered"),
  created_at: z.string(),
  data: outboundEmailEventData,
});
