import {
  stopAutomationResponse,
  type StopAutomationResponse,
} from "packages/models/src/stopAutomationResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiAutomationsAutomationIdStopArgs = { automation_id: string };

export type CreateApiAutomationsAutomationIdStopBody = void;

export const useCreateApiAutomationsAutomationIdStop = (
  options: UseMutationOptions<
    StopAutomationResponse,
    Error,
    UseCreateApiAutomationsAutomationIdStopArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiAutomationsAutomationIdStopArgs) =>
      apiFetch(
        buildUrl("/automations/{automation_id}/stop", { automation_id: args.automation_id }),
        stopAutomationResponse,
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
