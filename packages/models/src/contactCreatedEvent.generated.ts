import {
  type ContactEventData,
  contactEventData,
} from "packages/models/src/contactEventData.generated.ts";
import { z } from "zod";

export type ContactCreatedEvent = {
  type: "contact.created";
  created_at: string;
  data: ContactEventData;
};

export const contactCreatedEvent = z.object({
  type: z.literal("contact.created"),
  created_at: z.string(),
  data: contactEventData,
});
