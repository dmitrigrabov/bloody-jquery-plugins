import type { CreateContactPropertyOptions } from "packages/models/src/createContactPropertyOptions.generated.ts";
import {
  createContactPropertyResponseSuccess,
  type CreateContactPropertyResponseSuccess,
} from "packages/models/src/createContactPropertyResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiContactPropertiesArgs = { body: CreateContactPropertyOptions };

export const useCreateApiContactProperties = (
  options: UseMutationOptions<
    CreateContactPropertyResponseSuccess,
    Error,
    UseCreateApiContactPropertiesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiContactPropertiesArgs) =>
      apiFetch("/contact-properties", createContactPropertyResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contact Properties"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
