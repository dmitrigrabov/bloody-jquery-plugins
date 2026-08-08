import { z } from "zod";

export type Response1 = {
  businessId: string;
  typeOfBusiness: "self-employment" | "uk-property" | "foreign-property" | "property-unspecified";
  tradingType?: string | undefined;
  tradingName?: string | undefined;
  yearOfMigration?: unknown | undefined;
  firstAccountingPeriodStartDate?: string | undefined;
  firstAccountingPeriodEndDate?: string | undefined;
  latencyDetails?:
    | {
        latencyEndDate: string;
        taxYear1: unknown;
        latencyIndicator1: "A" | "Q";
        taxYear2: unknown;
        latencyIndicator2: "A" | "Q";
      }
    | undefined;
  quarterlyTypeChoice?:
    | { quarterlyPeriodType: "standard" | "calendar"; taxYearOfChoice: string }
    | undefined;
  accountingPeriods?: Array<{ start: string; end: string }> | undefined;
  commencementDate?: string | undefined;
  cessationDate?: string | undefined;
  businessAddressLineOne?: string | undefined;
  businessAddressLineTwo?: string | undefined;
  businessAddressLineThree?: string | undefined;
  businessAddressLineFour?: string | undefined;
  businessAddressPostcode?: string | undefined;
  businessAddressCountryCode?: string | undefined;
};

export const response1 = z.object({
  businessId: z.string().regex(/^X[a-zA-Z0-9]{1}IS[0-9]{11}$/),
  typeOfBusiness: z.enum([
    "self-employment",
    "uk-property",
    "foreign-property",
    "property-unspecified",
  ]),
  tradingType: z.string().min(1).max(35).optional(),
  tradingName: z.string().max(105).optional(),
  yearOfMigration: z
    .string()
    .regex(/^(\d{4})$/)
    .optional(),
  firstAccountingPeriodStartDate: z.string().optional(),
  firstAccountingPeriodEndDate: z.string().optional(),
  latencyDetails: z
    .object({
      latencyEndDate: z.string(),
      taxYear1: z.string().min(7).max(7),
      latencyIndicator1: z.enum(["A", "Q"]),
      taxYear2: z.string().min(7).max(7),
      latencyIndicator2: z.enum(["A", "Q"]),
    })
    .optional(),
  quarterlyTypeChoice: z
    .object({
      quarterlyPeriodType: z.enum(["standard", "calendar"]),
      taxYearOfChoice: z.string().regex(/^2[0-9]{3}-[0-9]{2}$/),
    })
    .optional(),
  accountingPeriods: z.array(z.object({ start: z.string(), end: z.string() })).optional(),
  commencementDate: z.string().optional(),
  cessationDate: z.string().optional(),
  businessAddressLineOne: z.string().min(1).max(35).optional(),
  businessAddressLineTwo: z.string().min(1).max(35).optional(),
  businessAddressLineThree: z.string().min(1).max(35).optional(),
  businessAddressLineFour: z.string().min(1).max(35).optional(),
  businessAddressPostcode: z.string().min(1).max(10).optional(),
  businessAddressCountryCode: z.string().optional(),
});
