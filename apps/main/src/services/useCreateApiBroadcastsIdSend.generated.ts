import type { SendBroadcastOptions } from "packages/models/src/sendBroadcastOptions.generated.ts";
import {
  sendBroadcastResponseSuccess,
  type SendBroadcastResponseSuccess,
} from "packages/models/src/sendBroadcastResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiBroadcastsIdSendArgs = { id: string; body: SendBroadcastOptions };

export const useCreateApiBroadcastsIdSend = (
  options: UseMutationOptions<
    SendBroadcastResponseSuccess,
    Error,
    UseCreateApiBroadcastsIdSendArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiBroadcastsIdSendArgs) =>
      apiFetch(buildUrl("/broadcasts/{id}/send", { id: args.id }), sendBroadcastResponseSuccess, {
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
