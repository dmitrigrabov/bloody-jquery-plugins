import { type LogSummary, logSummary } from "packages/models/src/logSummary.generated.ts";
import { z } from "zod";

export type ListLogsResponse = {
  object?: string | undefined;
  has_more?: boolean | undefined;
  data?: Array<LogSummary> | undefined;
};

export const listLogsResponse = z.object({
  object: z.string().optional(),
  has_more: z.boolean().optional(),
  data: z.array(logSummary).optional(),
});
