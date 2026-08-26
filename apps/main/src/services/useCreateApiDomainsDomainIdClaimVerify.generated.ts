import { domainClaim, type DomainClaim } from "packages/models/src/domainClaim.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiDomainsDomainIdClaimVerifyArgs = { domain_id: string };

export type CreateApiDomainsDomainIdClaimVerifyBody = void;

export const useCreateApiDomainsDomainIdClaimVerify = (
  options: UseMutationOptions<
    DomainClaim,
    Error,
    UseCreateApiDomainsDomainIdClaimVerifyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiDomainsDomainIdClaimVerifyArgs) =>
      apiFetch(
        buildUrl("/domains/{domain_id}/claim/verify", { domain_id: args.domain_id }),
        domainClaim,
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
