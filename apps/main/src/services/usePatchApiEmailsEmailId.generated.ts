import {
  updateEmailOptions,
  type UpdateEmailOptions,
} from "packages/models/src/updateEmailOptions.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiEmailsEmailIdArgs = { email_id: string };

export type PatchApiEmailsEmailIdBody = void;

export const usePatchApiEmailsEmailId = (
  options: UseMutationOptions<
    UpdateEmailOptions,
    Error,
    UsePatchApiEmailsEmailIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiEmailsEmailIdArgs) =>
      apiFetch(buildUrl("/emails/{email_id}", { email_id: args.email_id }), updateEmailOptions, {
        method: "PATCH",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Emails"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
