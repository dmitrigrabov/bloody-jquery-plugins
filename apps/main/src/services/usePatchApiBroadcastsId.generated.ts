import type { UpdateBroadcastOptions } from "packages/models/src/updateBroadcastOptions.generated.ts";
import {
  updateBroadcastResponseSuccess,
  type UpdateBroadcastResponseSuccess,
} from "packages/models/src/updateBroadcastResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiBroadcastsIdArgs = { id: string; body: UpdateBroadcastOptions };

export const usePatchApiBroadcastsId = (
  options: UseMutationOptions<
    UpdateBroadcastResponseSuccess,
    Error,
    UsePatchApiBroadcastsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiBroadcastsIdArgs) =>
      apiFetch(buildUrl("/broadcasts/{id}", { id: args.id }), updateBroadcastResponseSuccess, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Broadcasts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
