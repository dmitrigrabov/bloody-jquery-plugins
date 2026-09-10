import { z } from "zod";

export type Request = { quarterlyPeriodType: "standard" | "calendar" };

export const request = z.object({ quarterlyPeriodType: z.enum(["standard", "calendar"]) });
