import type { CreateAutomationRequest } from "packages/models/src/createAutomationRequest.generated.ts";
import {
  createAutomationResponse,
  type CreateAutomationResponse,
} from "packages/models/src/createAutomationResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiAutomationsArgs = { body: CreateAutomationRequest };

export const useCreateApiAutomations = (
  options: UseMutationOptions<
    CreateAutomationResponse,
    Error,
    UseCreateApiAutomationsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiAutomationsArgs) =>
      apiFetch("/automations", createAutomationResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Automations"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
