import type { SendEmailRequest } from "packages/models/src/sendEmailRequest.generated.ts";
import {
  sendEmailResponse,
  type SendEmailResponse,
} from "packages/models/src/sendEmailResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiEmailsArgs = {
  "Idempotency-Key"?: string | undefined;
  body: SendEmailRequest;
};

export const useCreateApiEmails = (
  options: UseMutationOptions<SendEmailResponse, Error, UseCreateApiEmailsArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiEmailsArgs) =>
      apiFetch("/emails", sendEmailResponse, {
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
