import {
  verifyDomainResponse,
  type VerifyDomainResponse,
} from "packages/models/src/verifyDomainResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiDomainsDomainIdVerifyArgs = { domain_id: string };

export type CreateApiDomainsDomainIdVerifyBody = void;

export const useCreateApiDomainsDomainIdVerify = (
  options: UseMutationOptions<
    VerifyDomainResponse,
    Error,
    UseCreateApiDomainsDomainIdVerifyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiDomainsDomainIdVerifyArgs) =>
      apiFetch(
        buildUrl("/domains/{domain_id}/verify", { domain_id: args.domain_id }),
        verifyDomainResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Domains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
