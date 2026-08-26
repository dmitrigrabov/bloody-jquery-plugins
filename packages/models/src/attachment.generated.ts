import { z } from "zod";

export type Attachment = {
  content?: string | undefined;
  filename?: string | undefined;
  path?: string | undefined;
  content_type?: string | undefined;
  content_id?: string | undefined;
};

export const attachment = z.object({
  content: z.string().optional(),
  filename: z.string().optional(),
  path: z.string().optional(),
  content_type: z.string().optional(),
  content_id: z.string().optional(),
});
