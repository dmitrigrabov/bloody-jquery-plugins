import {
  duplicateTemplateResponseSuccess,
  type DuplicateTemplateResponseSuccess,
} from "packages/models/src/duplicateTemplateResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiTemplatesIdDuplicateArgs = { id: string };

export type CreateApiTemplatesIdDuplicateBody = void;

export const useCreateApiTemplatesIdDuplicate = (
  options: UseMutationOptions<
    DuplicateTemplateResponseSuccess,
    Error,
    UseCreateApiTemplatesIdDuplicateArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiTemplatesIdDuplicateArgs) =>
      apiFetch(
        buildUrl("/templates/{id}/duplicate", { id: args.id }),
        duplicateTemplateResponseSuccess,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Templates"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
