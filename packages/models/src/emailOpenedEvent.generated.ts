import {
  type OutboundEmailEventData,
  outboundEmailEventData,
} from "packages/models/src/outboundEmailEventData.generated.ts";
import { z } from "zod";

export type EmailOpenedEvent = {
  type: "email.opened";
  created_at: string;
  data: OutboundEmailEventData;
};

export const emailOpenedEvent = z.object({
  type: z.literal("email.opened"),
  created_at: z.string(),
  data: outboundEmailEventData,
});
