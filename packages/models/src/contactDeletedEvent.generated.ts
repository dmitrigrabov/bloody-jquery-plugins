import {
  type ContactEventData,
  contactEventData,
} from "packages/models/src/contactEventData.generated.ts";
import { z } from "zod";

export type ContactDeletedEvent = {
  type: "contact.deleted";
  created_at: string;
  data: ContactEventData;
};

export const contactDeletedEvent = z.object({
  type: z.literal("contact.deleted"),
  created_at: z.string(),
  data: contactEventData,
});
