import type { CreateEventRequest } from "packages/models/src/createEventRequest.generated.ts";
import {
  createEventResponse,
  type CreateEventResponse,
} from "packages/models/src/createEventResponse.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiEventsArgs = { body: CreateEventRequest };

export const useCreateApiEvents = (
  options: UseMutationOptions<CreateEventResponse, Error, UseCreateApiEventsArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiEventsArgs) =>
      apiFetch("/events", createEventResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Events"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
