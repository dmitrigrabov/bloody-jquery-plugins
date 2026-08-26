import type { BatchRemoveSuppressionsOptions } from "packages/models/src/batchRemoveSuppressionsOptions.generated.ts";
import {
  batchRemoveSuppressionsResponseSuccess,
  type BatchRemoveSuppressionsResponseSuccess,
} from "packages/models/src/batchRemoveSuppressionsResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiSuppressionsBatchRemoveArgs = { body: BatchRemoveSuppressionsOptions };

export const useCreateApiSuppressionsBatchRemove = (
  options: UseMutationOptions<
    BatchRemoveSuppressionsResponseSuccess,
    Error,
    UseCreateApiSuppressionsBatchRemoveArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiSuppressionsBatchRemoveArgs) =>
      apiFetch("/suppressions/batch/remove", batchRemoveSuppressionsResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Suppressions"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
