import {
  deleteAutomationResponse,
  type DeleteAutomationResponse,
} from "packages/models/src/deleteAutomationResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiAutomationsAutomationIdArgs = { automation_id: string };

export type DeleteApiAutomationsAutomationIdBody = void;

export const useDeleteApiAutomationsAutomationId = (
  options: UseMutationOptions<
    DeleteAutomationResponse,
    Error,
    UseDeleteApiAutomationsAutomationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiAutomationsAutomationIdArgs) =>
      apiFetch(
        buildUrl("/automations/{automation_id}", { automation_id: args.automation_id }),
        deleteAutomationResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Automations"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
