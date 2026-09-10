import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyArgs =
  {
    nino: string;
    businessId: string;
    taxYear: string;
    Accept: "application/vnd.hmrc.2.0+json";
    Authorization: string;
    "Gov-Test-Scenario"?: string | undefined;
  };

export const useCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyResponse =
  z.void();

export type UseCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyResponse =
  void;

export type CreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyBody =
  void;

export const useCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapply =
  (
    options: UseMutationOptions<
      UseCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyResponse,
      Error,
      UseCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/individuals/business/details/{nino}/{businessId}/{taxYear}/late-accounting-date-rule-election/disapply",
            { nino: args.nino, businessId: args.businessId, taxYear: args.taxYear },
          ),
          useCreateApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyResponse,
          { method: "POST" },
        ),
      onSuccess: (data, variables, onMutateResult, context) => {
        // Invalidate and refetch
        void queryClient.invalidateQueries({ queryKey: ["Late Accounting Date Rule"] });

        onSuccess?.(data, variables, onMutateResult, context);
      },
      ...rest,
    });
  };
