import {
  deleteApiKeyResponse,
  type DeleteApiKeyResponse,
} from "packages/models/src/deleteApiKeyResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiApiKeysApiKeyIdArgs = { api_key_id: string };

export type DeleteApiApiKeysApiKeyIdBody = void;

export const useDeleteApiApiKeysApiKeyId = (
  options: UseMutationOptions<
    DeleteApiKeyResponse,
    Error,
    UseDeleteApiApiKeysApiKeyIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiApiKeysApiKeyIdArgs) =>
      apiFetch(
        buildUrl("/api-keys/{api_key_id}", { api_key_id: args.api_key_id }),
        deleteApiKeyResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["API Keys"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
