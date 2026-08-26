import type { UpdateApiKeyRequest } from "packages/models/src/updateApiKeyRequest.generated.ts";
import {
  updateApiKeyResponse,
  type UpdateApiKeyResponse,
} from "packages/models/src/updateApiKeyResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiApiKeysApiKeyIdArgs = { api_key_id: string; body: UpdateApiKeyRequest };

export const usePatchApiApiKeysApiKeyId = (
  options: UseMutationOptions<
    UpdateApiKeyResponse,
    Error,
    UsePatchApiApiKeysApiKeyIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiApiKeysApiKeyIdArgs) =>
      apiFetch(
        buildUrl("/api-keys/{api_key_id}", { api_key_id: args.api_key_id }),
        updateApiKeyResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["API Keys"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
