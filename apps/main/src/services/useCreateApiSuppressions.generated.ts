import type { CreateSuppressionOptions } from "packages/models/src/createSuppressionOptions.generated.ts";
import {
  createSuppressionResponseSuccess,
  type CreateSuppressionResponseSuccess,
} from "packages/models/src/createSuppressionResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiSuppressionsArgs = { body: CreateSuppressionOptions };

export const useCreateApiSuppressions = (
  options: UseMutationOptions<
    CreateSuppressionResponseSuccess,
    Error,
    UseCreateApiSuppressionsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiSuppressionsArgs) =>
      apiFetch("/suppressions", createSuppressionResponseSuccess, {
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
