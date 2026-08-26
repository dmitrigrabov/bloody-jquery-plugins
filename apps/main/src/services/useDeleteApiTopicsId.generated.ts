import {
  removeTopicResponseSuccess,
  type RemoveTopicResponseSuccess,
} from "packages/models/src/removeTopicResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiTopicsIdArgs = { id: string };

export type DeleteApiTopicsIdBody = void;

export const useDeleteApiTopicsId = (
  options: UseMutationOptions<
    RemoveTopicResponseSuccess,
    Error,
    UseDeleteApiTopicsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiTopicsIdArgs) =>
      apiFetch(buildUrl("/topics/{id}", { id: args.id }), removeTopicResponseSuccess, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Topics"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
