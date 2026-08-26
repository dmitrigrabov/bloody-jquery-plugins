import {
  type OutboundEmailEventData,
  outboundEmailEventData,
} from "packages/models/src/outboundEmailEventData.generated.ts";
import { z } from "zod";

export type EmailComplainedEvent = {
  type: "email.complained";
  created_at: string;
  data: OutboundEmailEventData;
};

export const emailComplainedEvent = z.object({
  type: z.literal("email.complained"),
  created_at: z.string(),
  data: outboundEmailEventData,
});
