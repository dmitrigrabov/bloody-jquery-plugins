import type { CreateContactOptions } from "packages/models/src/createContactOptions.generated.ts";
import {
  createContactResponseSuccess,
  type CreateContactResponseSuccess,
} from "packages/models/src/createContactResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiContactsArgs = { body: CreateContactOptions };

export const useCreateApiContacts = (
  options: UseMutationOptions<
    CreateContactResponseSuccess,
    Error,
    UseCreateApiContactsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiContactsArgs) =>
      apiFetch("/contacts", createContactResponseSuccess, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
