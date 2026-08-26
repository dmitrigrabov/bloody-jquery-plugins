import {
  removeSuppressionResponseSuccess,
  type RemoveSuppressionResponseSuccess,
} from "packages/models/src/removeSuppressionResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiSuppressionsSuppressionArgs = { suppression: string };

export type DeleteApiSuppressionsSuppressionBody = void;

export const useDeleteApiSuppressionsSuppression = (
  options: UseMutationOptions<
    RemoveSuppressionResponseSuccess,
    Error,
    UseDeleteApiSuppressionsSuppressionArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiSuppressionsSuppressionArgs) =>
      apiFetch(
        buildUrl("/suppressions/{suppression}", { suppression: args.suppression }),
        removeSuppressionResponseSuccess,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Suppressions"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
