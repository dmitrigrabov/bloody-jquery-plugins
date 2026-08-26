import {
  type EmailClickedEventData,
  emailClickedEventData,
} from "packages/models/src/emailClickedEventData.generated.ts";
import { z } from "zod";

export type EmailClickedEvent = {
  type: "email.clicked";
  created_at: string;
  data: EmailClickedEventData;
};

export const emailClickedEvent = z.object({
  type: z.literal("email.clicked"),
  created_at: z.string(),
  data: emailClickedEventData,
});
