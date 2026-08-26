import type { CreateBroadcastOptions } from "packages/models/src/createBroadcastOptions.generated.ts";
import {
  createBroadcastResponseSuccess,
  type CreateBroadcastResponseSuccess,
} from "packages/models/src/createBroadcastResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiBroadcastsArgs = { body: CreateBroadcastOptions };

export const useCreateApiBroadcasts = (
  options: UseMutationOptions<
    CreateBroadcastResponseSuccess,
    Error,
    UseCreateApiBroadcastsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiBroadcastsArgs) =>
      apiFetch("/broadcasts", createBroadcastResponseSuccess, {
        method: "POST",
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
