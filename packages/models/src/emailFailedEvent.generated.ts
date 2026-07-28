import {
  type EmailFailedEventData,
  emailFailedEventData,
} from "packages/models/src/emailFailedEventData.generated.ts";
import { z } from "zod";

export type EmailFailedEvent = {
  type: "email.failed";
  created_at: string;
  data: EmailFailedEventData;
};

export const emailFailedEvent = z.object({
  type: z.literal("email.failed"),
  created_at: z.string(),
  data: emailFailedEventData,
});
