import { z } from "zod";

export type ContactImportCounts = {
  total?: number | undefined;
  created?: number | undefined;
  updated?: number | undefined;
  skipped?: number | undefined;
  failed?: number | undefined;
};

export const contactImportCounts = z.object({
  total: z.number().int().optional(),
  created: z.number().int().optional(),
  updated: z.number().int().optional(),
  skipped: z.number().int().optional(),
  failed: z.number().int().optional(),
});
