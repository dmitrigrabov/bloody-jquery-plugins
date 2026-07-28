import { z } from "zod";

export type PublishTemplateResponseSuccess = {
  id?: string | undefined;
  object?: string | undefined;
};

export const publishTemplateResponseSuccess = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
});
