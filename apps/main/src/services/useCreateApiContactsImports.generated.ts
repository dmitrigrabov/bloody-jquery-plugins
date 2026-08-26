import {
  createContactImportResponseSuccess,
  type CreateContactImportResponseSuccess,
} from "packages/models/src/createContactImportResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiContactsImportsArgs = Record<string, never>;

export type CreateApiContactsImportsBody = void;

export const useCreateApiContactsImports = (
  options: UseMutationOptions<CreateContactImportResponseSuccess, Error, void, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: () =>
      apiFetch("/contacts/imports", createContactImportResponseSuccess, { method: "POST" }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
