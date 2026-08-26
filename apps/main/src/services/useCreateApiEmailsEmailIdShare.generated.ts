import type { ShareEmailOptions } from "packages/models/src/shareEmailOptions.generated.ts";
import {
  shareEmailResponse,
  type ShareEmailResponse,
} from "packages/models/src/shareEmailResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiEmailsEmailIdShareArgs = { email_id: string; body: ShareEmailOptions };

export const useCreateApiEmailsEmailIdShare = (
  options: UseMutationOptions<
    ShareEmailResponse,
    Error,
    UseCreateApiEmailsEmailIdShareArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiEmailsEmailIdShareArgs) =>
      apiFetch(
        buildUrl("/emails/{email_id}/share", { email_id: args.email_id }),
        shareEmailResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Emails"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
