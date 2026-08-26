import {
  removeContactResponseSuccess,
  type RemoveContactResponseSuccess,
} from "packages/models/src/removeContactResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiContactsIdArgs = { id: string };

export type DeleteApiContactsIdBody = void;

export const useDeleteApiContactsId = (
  options: UseMutationOptions<
    RemoveContactResponseSuccess,
    Error,
    UseDeleteApiContactsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiContactsIdArgs) =>
      apiFetch(buildUrl("/contacts/{id}", { id: args.id }), removeContactResponseSuccess, {
        method: "DELETE",
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
