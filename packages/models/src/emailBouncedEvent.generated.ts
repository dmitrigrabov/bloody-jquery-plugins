import {
  type EmailBouncedEventData,
  emailBouncedEventData,
} from "packages/models/src/emailBouncedEventData.generated.ts";
import { z } from "zod";

export type EmailBouncedEvent = {
  type: "email.bounced";
  created_at: string;
  data: EmailBouncedEventData;
};

export const emailBouncedEvent = z.object({
  type: z.literal("email.bounced"),
  created_at: z.string(),
  data: emailBouncedEventData,
});
