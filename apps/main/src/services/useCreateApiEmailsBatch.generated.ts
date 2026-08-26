import type { SendEmailRequest } from "packages/models/src/sendEmailRequest.generated.ts";
import {
  createBatchEmailsResponse,
  type CreateBatchEmailsResponse,
} from "packages/models/src/createBatchEmailsResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiEmailsBatchArgs = {
  "Idempotency-Key"?: string | undefined;
  body: Array<SendEmailRequest>;
};

export type CreateApiEmailsBatchBody = Array<SendEmailRequest>;

export const useCreateApiEmailsBatch = (
  options: UseMutationOptions<
    CreateBatchEmailsResponse,
    Error,
    UseCreateApiEmailsBatchArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiEmailsBatchArgs) =>
      apiFetch("/emails/batch", createBatchEmailsResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Emails"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
