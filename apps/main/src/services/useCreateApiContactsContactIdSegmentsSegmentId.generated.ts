import {
  addContactToSegmentResponseSuccess,
  type AddContactToSegmentResponseSuccess,
} from "packages/models/src/addContactToSegmentResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiContactsContactIdSegmentsSegmentIdArgs = {
  contact_id: string;
  segment_id: string;
};

export type CreateApiContactsContactIdSegmentsSegmentIdBody = void;

export const useCreateApiContactsContactIdSegmentsSegmentId = (
  options: UseMutationOptions<
    AddContactToSegmentResponseSuccess,
    Error,
    UseCreateApiContactsContactIdSegmentsSegmentIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiContactsContactIdSegmentsSegmentIdArgs) =>
      apiFetch(
        buildUrl("/contacts/{contact_id}/segments/{segment_id}", {
          contact_id: args.contact_id,
          segment_id: args.segment_id,
        }),
        addContactToSegmentResponseSuccess,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
