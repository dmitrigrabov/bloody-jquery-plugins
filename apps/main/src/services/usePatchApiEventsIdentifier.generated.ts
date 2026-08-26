import type { UpdateEventRequest } from "packages/models/src/updateEventRequest.generated.ts";
import {
  updateEventResponse,
  type UpdateEventResponse,
} from "packages/models/src/updateEventResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiEventsIdentifierArgs = { identifier: string; body: UpdateEventRequest };

export const usePatchApiEventsIdentifier = (
  options: UseMutationOptions<
    UpdateEventResponse,
    Error,
    UsePatchApiEventsIdentifierArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiEventsIdentifierArgs) =>
      apiFetch(
        buildUrl("/events/{identifier}", { identifier: args.identifier }),
        updateEventResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Events"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
