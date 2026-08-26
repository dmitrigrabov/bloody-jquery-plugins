import {
  type OutboundEmailEventData,
  outboundEmailEventData,
} from "packages/models/src/outboundEmailEventData.generated.ts";
import { z } from "zod";

export type EmailSentEvent = {
  type: "email.sent";
  created_at: string;
  data: OutboundEmailEventData;
};

export const emailSentEvent = z.object({
  type: z.literal("email.sent"),
  created_at: z.string(),
  data: outboundEmailEventData,
});
