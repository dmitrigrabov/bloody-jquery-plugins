import type { UpdateTopicOptions } from "packages/models/src/updateTopicOptions.generated.ts";
import {
  updateTopicResponseSuccess,
  type UpdateTopicResponseSuccess,
} from "packages/models/src/updateTopicResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiTopicsIdArgs = { id: string; body: UpdateTopicOptions };

export const usePatchApiTopicsId = (
  options: UseMutationOptions<
    UpdateTopicResponseSuccess,
    Error,
    UsePatchApiTopicsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiTopicsIdArgs) =>
      apiFetch(buildUrl("/topics/{id}", { id: args.id }), updateTopicResponseSuccess, {
        method: "PATCH",
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
