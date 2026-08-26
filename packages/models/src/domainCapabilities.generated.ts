import { z } from "zod";

export type DomainCapabilities = {
  sending?: ("enabled" | "disabled") | undefined;
  receiving?: ("enabled" | "disabled") | undefined;
};

export const domainCapabilities = z.object({
  sending: z.enum(["enabled", "disabled"]).optional(),
  receiving: z.enum(["enabled", "disabled"]).optional(),
});
