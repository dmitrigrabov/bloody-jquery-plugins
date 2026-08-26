import type { UpdateSegmentOptions } from "packages/models/src/updateSegmentOptions.generated.ts";
import {
  updateSegmentResponseSuccess,
  type UpdateSegmentResponseSuccess,
} from "packages/models/src/updateSegmentResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiSegmentsIdArgs = { id: string; body: UpdateSegmentOptions };

export const usePatchApiSegmentsId = (
  options: UseMutationOptions<
    UpdateSegmentResponseSuccess,
    Error,
    UsePatchApiSegmentsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiSegmentsIdArgs) =>
      apiFetch(buildUrl("/segments/{id}", { id: args.id }), updateSegmentResponseSuccess, {
        method: "PATCH",
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
