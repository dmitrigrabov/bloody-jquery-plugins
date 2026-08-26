import {
  type EmailSuppressedEventData,
  emailSuppressedEventData,
} from "packages/models/src/emailSuppressedEventData.generated.ts";
import { z } from "zod";

export type EmailSuppressedEvent = {
  type: "email.suppressed";
  created_at: string;
  data: EmailSuppressedEventData;
};

export const emailSuppressedEvent = z.object({
  type: z.literal("email.suppressed"),
  created_at: z.string(),
  data: emailSuppressedEventData,
});
