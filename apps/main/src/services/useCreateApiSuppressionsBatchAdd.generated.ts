import type { BatchAddSuppressionsOptions } from "packages/models/src/batchAddSuppressionsOptions.generated.ts";
import {
  batchAddSuppressionsResponseSuccess,
  type BatchAddSuppressionsResponseSuccess,
} from "packages/models/src/batchAddSuppressionsResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiSuppressionsBatchAddArgs = { body: BatchAddSuppressionsOptions };

export const useCreateApiSuppressionsBatchAdd = (
  options: UseMutationOptions<
    BatchAddSuppressionsResponseSuccess,
    Error,
    UseCreateApiSuppressionsBatchAddArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiSuppressionsBatchAddArgs) =>
      apiFetch("/suppressions/batch/add", batchAddSuppressionsResponseSuccess, {
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
