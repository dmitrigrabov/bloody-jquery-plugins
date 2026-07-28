import type { CreateTemplateRequest } from "packages/models/src/createTemplateRequest.generated.ts";
import {
  createTemplateResponseSuccess,
  type CreateTemplateResponseSuccess,
} from "packages/models/src/createTemplateResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiTemplatesArgs = { body: CreateTemplateRequest };

export const useCreateApiTemplates = (
  options: UseMutationOptions<
    CreateTemplateResponseSuccess,
    Error,
    UseCreateApiTemplatesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiTemplatesArgs) =>
      apiFetch("/templates", createTemplateResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Templates"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
