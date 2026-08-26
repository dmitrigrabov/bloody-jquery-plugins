import {
  duplicateAutomationResponse,
  type DuplicateAutomationResponse,
} from "packages/models/src/duplicateAutomationResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiAutomationsAutomationIdDuplicateArgs = { automation_id: string };

export type CreateApiAutomationsAutomationIdDuplicateBody = void;

export const useCreateApiAutomationsAutomationIdDuplicate = (
  options: UseMutationOptions<
    DuplicateAutomationResponse,
    Error,
    UseCreateApiAutomationsAutomationIdDuplicateArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiAutomationsAutomationIdDuplicateArgs) =>
      apiFetch(
        buildUrl("/automations/{automation_id}/duplicate", { automation_id: args.automation_id }),
        duplicateAutomationResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Automations"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
