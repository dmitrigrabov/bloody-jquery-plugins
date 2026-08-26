import {
  removeTemplateResponseSuccess,
  type RemoveTemplateResponseSuccess,
} from "packages/models/src/removeTemplateResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiTemplatesIdArgs = { id: string };

export type DeleteApiTemplatesIdBody = void;

export const useDeleteApiTemplatesId = (
  options: UseMutationOptions<
    RemoveTemplateResponseSuccess,
    Error,
    UseDeleteApiTemplatesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiTemplatesIdArgs) =>
      apiFetch(buildUrl("/templates/{id}", { id: args.id }), removeTemplateResponseSuccess, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Templates"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
