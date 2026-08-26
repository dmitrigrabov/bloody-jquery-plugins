import type { CreateDomainRequest } from "packages/models/src/createDomainRequest.generated.ts";
import {
  createDomainResponse,
  type CreateDomainResponse,
} from "packages/models/src/createDomainResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiDomainsArgs = { body: CreateDomainRequest };

export const useCreateApiDomains = (
  options: UseMutationOptions<CreateDomainResponse, Error, UseCreateApiDomainsArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiDomainsArgs) =>
      apiFetch("/domains", createDomainResponse, {
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
