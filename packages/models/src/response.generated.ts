import { z } from "zod";

export type Response = {
  listOfBusinesses: Array<{
    typeOfBusiness: "self-employment" | "uk-property" | "foreign-property" | "property-unspecified";
    businessId: string;
    tradingType?: string | undefined;
    tradingName?: string | undefined;
  }>;
};

export const response = z.object({
  listOfBusinesses: z.array(
    z.object({
      typeOfBusiness: z.enum([
        "self-employment",
        "uk-property",
        "foreign-property",
        "property-unspecified",
      ]),
      businessId: z.string().regex(/^X[a-zA-Z0-9]{1}IS[0-9]{11}$/),
      tradingType: z.string().min(1).max(35).optional(),
      tradingName: z.string().max(105).optional(),
    }),
  ),
});
