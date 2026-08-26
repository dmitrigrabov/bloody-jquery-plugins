import type { CreateAudienceOptions } from "packages/models/src/createAudienceOptions.generated.ts";
import {
  createAudienceResponseSuccess,
  type CreateAudienceResponseSuccess,
} from "packages/models/src/createAudienceResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiAudiencesArgs = { body: CreateAudienceOptions };

export const useCreateApiAudiences = (
  options: UseMutationOptions<
    CreateAudienceResponseSuccess,
    Error,
    UseCreateApiAudiencesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiAudiencesArgs) =>
      apiFetch("/audiences", createAudienceResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Audiences"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
