import {
  removeContactFromSegmentResponseSuccess,
  type RemoveContactFromSegmentResponseSuccess,
} from "packages/models/src/removeContactFromSegmentResponseSuccess.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiContactsContactIdSegmentsSegmentIdArgs = {
  contact_id: string;
  segment_id: string;
};

export type DeleteApiContactsContactIdSegmentsSegmentIdBody = void;

export const useDeleteApiContactsContactIdSegmentsSegmentId = (
  options: UseMutationOptions<
    RemoveContactFromSegmentResponseSuccess,
    Error,
    UseDeleteApiContactsContactIdSegmentsSegmentIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiContactsContactIdSegmentsSegmentIdArgs) =>
      apiFetch(
        buildUrl("/contacts/{contact_id}/segments/{segment_id}", {
          contact_id: args.contact_id,
          segment_id: args.segment_id,
        }),
        removeContactFromSegmentResponseSuccess,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["Contacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
