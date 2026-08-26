import {
  removeEventResponse,
  type RemoveEventResponse,
} from "packages/models/src/removeEventResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiEventsIdentifierArgs = { identifier: string };

export type DeleteApiEventsIdentifierBody = void;

export const useDeleteApiEventsIdentifier = (
  options: UseMutationOptions<
    RemoveEventResponse,
    Error,
    UseDeleteApiEventsIdentifierArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiEventsIdentifierArgs) =>
      apiFetch(
        buildUrl("/events/{identifier}", { identifier: args.identifier }),
        removeEventResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Events"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
