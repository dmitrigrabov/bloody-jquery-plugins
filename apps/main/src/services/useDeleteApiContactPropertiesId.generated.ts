import {
  removeContactPropertyResponseSuccess,
  type RemoveContactPropertyResponseSuccess,
} from "packages/models/src/removeContactPropertyResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiContactPropertiesIdArgs = { id: string };

export type DeleteApiContactPropertiesIdBody = void;

export const useDeleteApiContactPropertiesId = (
  options: UseMutationOptions<
    RemoveContactPropertyResponseSuccess,
    Error,
    UseDeleteApiContactPropertiesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiContactPropertiesIdArgs) =>
      apiFetch(
        buildUrl("/contact-properties/{id}", { id: args.id }),
        removeContactPropertyResponseSuccess,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contact Properties"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
