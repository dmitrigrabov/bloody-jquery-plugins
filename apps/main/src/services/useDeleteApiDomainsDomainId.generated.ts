import {
  deleteDomainResponse,
  type DeleteDomainResponse,
} from "packages/models/src/deleteDomainResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiDomainsDomainIdArgs = { domain_id: string };

export type DeleteApiDomainsDomainIdBody = void;

export const useDeleteApiDomainsDomainId = (
  options: UseMutationOptions<
    DeleteDomainResponse,
    Error,
    UseDeleteApiDomainsDomainIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiDomainsDomainIdArgs) =>
      apiFetch(
        buildUrl("/domains/{domain_id}", { domain_id: args.domain_id }),
        deleteDomainResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Domains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
