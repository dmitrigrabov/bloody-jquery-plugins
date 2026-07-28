import type { UpdateWebhookRequest } from "packages/models/src/updateWebhookRequest.generated.ts";
import {
  updateWebhookResponse,
  type UpdateWebhookResponse,
} from "packages/models/src/updateWebhookResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiWebhooksWebhookIdArgs = { webhook_id: string; body: UpdateWebhookRequest };

export const usePatchApiWebhooksWebhookId = (
  options: UseMutationOptions<
    UpdateWebhookResponse,
    Error,
    UsePatchApiWebhooksWebhookIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiWebhooksWebhookIdArgs) =>
      apiFetch(
        buildUrl("/webhooks/{webhook_id}", { webhook_id: args.webhook_id }),
        updateWebhookResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Webhooks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
