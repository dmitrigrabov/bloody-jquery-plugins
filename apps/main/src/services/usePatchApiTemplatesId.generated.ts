import type { UpdateTemplateOptions } from "packages/models/src/updateTemplateOptions.generated.ts";
import {
  updateTemplateResponseSuccess,
  type UpdateTemplateResponseSuccess,
} from "packages/models/src/updateTemplateResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiTemplatesIdArgs = { id: string; body: UpdateTemplateOptions };

export const usePatchApiTemplatesId = (
  options: UseMutationOptions<
    UpdateTemplateResponseSuccess,
    Error,
    UsePatchApiTemplatesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiTemplatesIdArgs) =>
      apiFetch(buildUrl("/templates/{id}", { id: args.id }), updateTemplateResponseSuccess, {
        method: "PATCH",
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
