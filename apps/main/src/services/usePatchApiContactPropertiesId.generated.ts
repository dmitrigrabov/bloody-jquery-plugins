import type { UpdateContactPropertyOptions } from "packages/models/src/updateContactPropertyOptions.generated.ts";
import {
  updateContactPropertyResponseSuccess,
  type UpdateContactPropertyResponseSuccess,
} from "packages/models/src/updateContactPropertyResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiContactPropertiesIdArgs = { id: string; body: UpdateContactPropertyOptions };

export const usePatchApiContactPropertiesId = (
  options: UseMutationOptions<
    UpdateContactPropertyResponseSuccess,
    Error,
    UsePatchApiContactPropertiesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiContactPropertiesIdArgs) =>
      apiFetch(
        buildUrl("/contact-properties/{id}", { id: args.id }),
        updateContactPropertyResponseSuccess,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contact Properties"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
