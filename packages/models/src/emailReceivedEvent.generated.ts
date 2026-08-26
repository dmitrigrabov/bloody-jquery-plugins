import {
  type EmailReceivedEventData,
  emailReceivedEventData,
} from "packages/models/src/emailReceivedEventData.generated.ts";
import { z } from "zod";

export type EmailReceivedEvent = {
  type: "email.received";
  created_at: string;
  data: EmailReceivedEventData;
};

export const emailReceivedEvent = z.object({
  type: z.literal("email.received"),
  created_at: z.string(),
  data: emailReceivedEventData,
});
