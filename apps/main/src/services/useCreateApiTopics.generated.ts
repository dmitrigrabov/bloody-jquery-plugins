import type { CreateTopicOptions } from "packages/models/src/createTopicOptions.generated.ts";
import {
  createTopicResponseSuccess,
  type CreateTopicResponseSuccess,
} from "packages/models/src/createTopicResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiTopicsArgs = { body: CreateTopicOptions };

export const useCreateApiTopics = (
  options: UseMutationOptions<
    CreateTopicResponseSuccess,
    Error,
    UseCreateApiTopicsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiTopicsArgs) =>
      apiFetch("/topics", createTopicResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Topics"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
