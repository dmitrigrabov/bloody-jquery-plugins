import {
  removeAudienceResponseSuccess,
  type RemoveAudienceResponseSuccess,
} from "packages/models/src/removeAudienceResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiAudiencesIdArgs = { id: string };

export type DeleteApiAudiencesIdBody = void;

export const useDeleteApiAudiencesId = (
  options: UseMutationOptions<
    RemoveAudienceResponseSuccess,
    Error,
    UseDeleteApiAudiencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiAudiencesIdArgs) =>
      apiFetch(buildUrl("/audiences/{id}", { id: args.id }), removeAudienceResponseSuccess, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Audiences"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
