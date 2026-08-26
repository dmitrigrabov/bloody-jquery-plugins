import {
  publishTemplateResponseSuccess,
  type PublishTemplateResponseSuccess,
} from "packages/models/src/publishTemplateResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiTemplatesIdPublishArgs = { id: string };

export type CreateApiTemplatesIdPublishBody = void;

export const useCreateApiTemplatesIdPublish = (
  options: UseMutationOptions<
    PublishTemplateResponseSuccess,
    Error,
    UseCreateApiTemplatesIdPublishArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiTemplatesIdPublishArgs) =>
      apiFetch(
        buildUrl("/templates/{id}/publish", { id: args.id }),
        publishTemplateResponseSuccess,
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
