import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearArgs = {
  nino: string;
  businessId: string;
  taxYear: string;
  Accept: "application/vnd.hmrc.2.0+json";
  Authorization: string;
  "Gov-Test-Scenario"?: string | undefined;
  body: { quarterlyPeriodType: "standard" | "calendar" };
};

export const useUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearResponse = z.void();

export type UseUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearResponse = void;

export type UpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearBody = {
  quarterlyPeriodType: "standard" | "calendar";
};

export const useUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYear = (
  options: UseMutationOptions<
    UseUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearResponse,
    Error,
    UseUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearArgs) =>
      apiFetch(
        buildUrl("/individuals/business/details/{nino}/{businessId}/{taxYear}", {
          nino: args.nino,
          businessId: args.businessId,
          taxYear: args.taxYear,
        }),
        useUpdateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearResponse,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: [] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
