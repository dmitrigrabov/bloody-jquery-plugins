import {
  revokeOAuthGrantResponse,
  type RevokeOAuthGrantResponse,
} from "packages/models/src/revokeOAuthGrantResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiOauthGrantsOauthGrantIdArgs = { oauth_grant_id: string };

export type DeleteApiOauthGrantsOauthGrantIdBody = void;

export const useDeleteApiOauthGrantsOauthGrantId = (
  options: UseMutationOptions<
    RevokeOAuthGrantResponse,
    Error,
    UseDeleteApiOauthGrantsOauthGrantIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiOauthGrantsOauthGrantIdArgs) =>
      apiFetch(
        buildUrl("/oauth/grants/{oauth_grant_id}", { oauth_grant_id: args.oauth_grant_id }),
        revokeOAuthGrantResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["OAuth"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
