import type { CreateApiKeyRequest } from "packages/models/src/createApiKeyRequest.generated.ts";
import {
  createApiKeyResponse,
  type CreateApiKeyResponse,
} from "packages/models/src/createApiKeyResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiApiKeysArgs = { body: CreateApiKeyRequest };

export const useCreateApiApiKeys = (
  options: UseMutationOptions<CreateApiKeyResponse, Error, UseCreateApiApiKeysArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiApiKeysArgs) =>
      apiFetch("/api-keys", createApiKeyResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["API Keys"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
