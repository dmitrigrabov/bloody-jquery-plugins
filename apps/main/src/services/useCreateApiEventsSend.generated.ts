import type { SendEventRequest } from "packages/models/src/sendEventRequest.generated.ts";
import {
  sendEventResponse,
  type SendEventResponse,
} from "packages/models/src/sendEventResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiEventsSendArgs = { body: SendEventRequest };

export const useCreateApiEventsSend = (
  options: UseMutationOptions<SendEventResponse, Error, UseCreateApiEventsSendArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiEventsSendArgs) =>
      apiFetch("/events/send", sendEventResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Events"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
