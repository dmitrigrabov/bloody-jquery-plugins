import { listContactSegmentsResponseSuccess } from "packages/models/src/listContactSegmentsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactsContactIdSegmentsArgs = {
  contact_id: string;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiContactsContactIdSegmentsQueryOptions = (
  args: UseGetApiContactsContactIdSegmentsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /contacts/{contact_id}/segments",
      "Contacts",
      args.contact_id,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/contacts/{contact_id}/segments", {
          contact_id: args.contact_id,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listContactSegmentsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiContactsContactIdSegments = (args: UseGetApiContactsContactIdSegmentsArgs) =>
  useQuery(getApiContactsContactIdSegmentsQueryOptions(args));
