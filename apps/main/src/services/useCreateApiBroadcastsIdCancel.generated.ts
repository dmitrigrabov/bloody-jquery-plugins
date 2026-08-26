import {
  cancelBroadcastResponseSuccess,
  type CancelBroadcastResponseSuccess,
} from "packages/models/src/cancelBroadcastResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiBroadcastsIdCancelArgs = { id: string };

export type CreateApiBroadcastsIdCancelBody = void;

export const useCreateApiBroadcastsIdCancel = (
  options: UseMutationOptions<
    CancelBroadcastResponseSuccess,
    Error,
    UseCreateApiBroadcastsIdCancelArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiBroadcastsIdCancelArgs) =>
      apiFetch(
        buildUrl("/broadcasts/{id}/cancel", { id: args.id }),
        cancelBroadcastResponseSuccess,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Broadcasts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
