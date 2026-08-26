import { z } from "zod";

export type CreateContactImportOptions = {
  file: string;
  column_map?: string | undefined;
  on_conflict?: ("upsert" | "skip") | undefined;
  segments?: string | undefined;
  topics?: string | undefined;
};

export const createContactImportOptions = z.object({
  file: z.string(),
  column_map: z.string().optional(),
  on_conflict: z.enum(["upsert", "skip"]).optional(),
  segments: z.string().optional(),
  topics: z.string().optional(),
});
