import type { UpdateContactOptions } from "packages/models/src/updateContactOptions.generated.ts";
import {
  updateContactResponseSuccess,
  type UpdateContactResponseSuccess,
} from "packages/models/src/updateContactResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiContactsIdArgs = { id: string; body: UpdateContactOptions };

export const usePatchApiContactsId = (
  options: UseMutationOptions<
    UpdateContactResponseSuccess,
    Error,
    UsePatchApiContactsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiContactsIdArgs) =>
      apiFetch(buildUrl("/contacts/{id}", { id: args.id }), updateContactResponseSuccess, {
        method: "PATCH",
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
