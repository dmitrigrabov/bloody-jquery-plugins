import type { CreateSegmentOptions } from "packages/models/src/createSegmentOptions.generated.ts";
import {
  createSegmentResponseSuccess,
  type CreateSegmentResponseSuccess,
} from "packages/models/src/createSegmentResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiSegmentsArgs = { body: CreateSegmentOptions };

export const useCreateApiSegments = (
  options: UseMutationOptions<
    CreateSegmentResponseSuccess,
    Error,
    UseCreateApiSegmentsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiSegmentsArgs) =>
      apiFetch("/segments", createSegmentResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Segments"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
