import { z } from "zod";

export type Response2 = {
  disapply: boolean;
  eligible: boolean;
  taxYearOfElection?: unknown | undefined;
  taxYearElectionExpires?: unknown | undefined;
};

export const response2 = z.object({
  disapply: z.boolean(),
  eligible: z.boolean(),
  taxYearOfElection: z.string().optional(),
  taxYearElectionExpires: z.string().optional(),
});
