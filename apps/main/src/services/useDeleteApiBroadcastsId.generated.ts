import {
  removeBroadcastResponseSuccess,
  type RemoveBroadcastResponseSuccess,
} from "packages/models/src/removeBroadcastResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiBroadcastsIdArgs = { id: string };

export type DeleteApiBroadcastsIdBody = void;

export const useDeleteApiBroadcastsId = (
  options: UseMutationOptions<
    RemoveBroadcastResponseSuccess,
    Error,
    UseDeleteApiBroadcastsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiBroadcastsIdArgs) =>
      apiFetch(buildUrl("/broadcasts/{id}", { id: args.id }), removeBroadcastResponseSuccess, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Broadcasts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
