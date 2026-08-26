import {
  type ContactImportCounts,
  contactImportCounts,
} from "packages/models/src/contactImportCounts.generated.ts";
import { z } from "zod";

export type ContactImport = {
  object?: string | undefined;
  id?: string | undefined;
  status?: ("queued" | "in_progress" | "completed" | "failed") | undefined;
  created_at?: string | undefined;
  completed_at?: (string | null) | undefined;
  counts?: ContactImportCounts | undefined;
};

export const contactImport = z.object({
  object: z.string().optional(),
  id: z.string().optional(),
  status: z.enum(["queued", "in_progress", "completed", "failed"]).optional(),
  created_at: z.string().optional(),
  completed_at: z.string().nullable().optional(),
  counts: contactImportCounts.optional(),
});
