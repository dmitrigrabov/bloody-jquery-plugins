import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawArgs =
  {
    nino: string;
    businessId: string;
    taxYear: string;
    Accept: "application/vnd.hmrc.2.0+json";
    Authorization: string;
    "Gov-Test-Scenario"?: string | undefined;
  };

export const useDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawResponse =
  z.void();

export type UseDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawResponse =
  void;

export type DeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawBody =
  void;

export const useDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdraw =
  (
    options: UseMutationOptions<
      UseDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawResponse,
      Error,
      UseDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/individuals/business/details/{nino}/{businessId}/{taxYear}/late-accounting-date-rule-election/withdraw",
            { nino: args.nino, businessId: args.businessId, taxYear: args.taxYear },
          ),
          useDeleteApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawResponse,
          { method: "DELETE" },
        ),
      onSuccess: (data, variables, onMutateResult, context) => {
        // Invalidate and refetch
        void queryClient.invalidateQueries({ queryKey: ["Late Accounting Date Rule"] });

        onSuccess?.(data, variables, onMutateResult, context);
      },
      ...rest,
    });
  };
