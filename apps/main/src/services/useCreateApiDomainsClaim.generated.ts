import type { CreateDomainClaimRequest } from "packages/models/src/createDomainClaimRequest.generated.ts";
import { domainClaim, type DomainClaim } from "packages/models/src/domainClaim.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiDomainsClaimArgs = { body: CreateDomainClaimRequest };

export const useCreateApiDomainsClaim = (
  options: UseMutationOptions<DomainClaim, Error, UseCreateApiDomainsClaimArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiDomainsClaimArgs) =>
      apiFetch("/domains/claim", domainClaim, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Domains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
