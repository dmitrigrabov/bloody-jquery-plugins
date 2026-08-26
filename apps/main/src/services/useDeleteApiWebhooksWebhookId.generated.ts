import {
  deleteWebhookResponse,
  type DeleteWebhookResponse,
} from "packages/models/src/deleteWebhookResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiWebhooksWebhookIdArgs = { webhook_id: string };

export type DeleteApiWebhooksWebhookIdBody = void;

export const useDeleteApiWebhooksWebhookId = (
  options: UseMutationOptions<
    DeleteWebhookResponse,
    Error,
    UseDeleteApiWebhooksWebhookIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiWebhooksWebhookIdArgs) =>
      apiFetch(
        buildUrl("/webhooks/{webhook_id}", { webhook_id: args.webhook_id }),
        deleteWebhookResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Webhooks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
