import type { CreateWebhookRequest } from "packages/models/src/createWebhookRequest.generated.ts";
import {
  createWebhookResponse,
  type CreateWebhookResponse,
} from "packages/models/src/createWebhookResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiWebhooksArgs = { body: CreateWebhookRequest };

export const useCreateApiWebhooks = (
  options: UseMutationOptions<CreateWebhookResponse, Error, UseCreateApiWebhooksArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiWebhooksArgs) =>
      apiFetch("/webhooks", createWebhookResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Webhooks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
