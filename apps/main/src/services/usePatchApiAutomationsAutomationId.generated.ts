import type { PatchAutomationRequest } from "packages/models/src/patchAutomationRequest.generated.ts";
import {
  patchAutomationResponse,
  type PatchAutomationResponse,
} from "packages/models/src/patchAutomationResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiAutomationsAutomationIdArgs = {
  automation_id: string;
  body: PatchAutomationRequest;
};

export const usePatchApiAutomationsAutomationId = (
  options: UseMutationOptions<
    PatchAutomationResponse,
    Error,
    UsePatchApiAutomationsAutomationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiAutomationsAutomationIdArgs) =>
      apiFetch(
        buildUrl("/automations/{automation_id}", { automation_id: args.automation_id }),
        patchAutomationResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Automations"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
