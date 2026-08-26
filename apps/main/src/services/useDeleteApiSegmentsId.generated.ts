import {
  removeSegmentResponseSuccess,
  type RemoveSegmentResponseSuccess,
} from "packages/models/src/removeSegmentResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiSegmentsIdArgs = { id: string };

export type DeleteApiSegmentsIdBody = void;

export const useDeleteApiSegmentsId = (
  options: UseMutationOptions<
    RemoveSegmentResponseSuccess,
    Error,
    UseDeleteApiSegmentsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiSegmentsIdArgs) =>
      apiFetch(buildUrl("/segments/{id}", { id: args.id }), removeSegmentResponseSuccess, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Segments"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
