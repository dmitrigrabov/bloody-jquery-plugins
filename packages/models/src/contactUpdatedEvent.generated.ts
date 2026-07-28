import {
  type ContactEventData,
  contactEventData,
} from "packages/models/src/contactEventData.generated.ts";
import { z } from "zod";

export type ContactUpdatedEvent = {
  type: "contact.updated";
  created_at: string;
  data: ContactEventData;
};

export const contactUpdatedEvent = z.object({
  type: z.literal("contact.updated"),
  created_at: z.string(),
  data: contactEventData,
});
