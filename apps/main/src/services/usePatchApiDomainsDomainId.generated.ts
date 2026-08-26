import type { UpdateDomainOptions } from "packages/models/src/updateDomainOptions.generated.ts";
import {
  updateDomainResponseSuccess,
  type UpdateDomainResponseSuccess,
} from "packages/models/src/updateDomainResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiDomainsDomainIdArgs = { domain_id: string; body: UpdateDomainOptions };

export const usePatchApiDomainsDomainId = (
  options: UseMutationOptions<
    UpdateDomainResponseSuccess,
    Error,
    UsePatchApiDomainsDomainIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiDomainsDomainIdArgs) =>
      apiFetch(
        buildUrl("/domains/{domain_id}", { domain_id: args.domain_id }),
        updateDomainResponseSuccess,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Domains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
