import { email, type Email } from "packages/models/src/email.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiEmailsEmailIdCancelArgs = { email_id: string };

export type CreateApiEmailsEmailIdCancelBody = void;

export const useCreateApiEmailsEmailIdCancel = (
  options: UseMutationOptions<Email, Error, UseCreateApiEmailsEmailIdCancelArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiEmailsEmailIdCancelArgs) =>
      apiFetch(buildUrl("/emails/{email_id}/cancel", { email_id: args.email_id }), email, {
        method: "POST",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Emails"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
