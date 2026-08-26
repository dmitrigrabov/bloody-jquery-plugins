import type { UpdateContactTopicsOptions } from "packages/models/src/updateContactTopicsOptions.generated.ts";
import {
  updateContactTopicsResponseSuccess,
  type UpdateContactTopicsResponseSuccess,
} from "packages/models/src/updateContactTopicsResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiContactsContactIdTopicsArgs = {
  contact_id: string;
  body: UpdateContactTopicsOptions;
};

export const usePatchApiContactsContactIdTopics = (
  options: UseMutationOptions<
    UpdateContactTopicsResponseSuccess,
    Error,
    UsePatchApiContactsContactIdTopicsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiContactsContactIdTopicsArgs) =>
      apiFetch(
        buildUrl("/contacts/{contact_id}/topics", { contact_id: args.contact_id }),
        updateContactTopicsResponseSuccess,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
