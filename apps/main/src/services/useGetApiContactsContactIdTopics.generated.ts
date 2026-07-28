import { getContactTopicsResponseSuccess } from "packages/models/src/getContactTopicsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactsContactIdTopicsArgs = {
  contact_id: string;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiContactsContactIdTopicsQueryOptions = (
  args: UseGetApiContactsContactIdTopicsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /contacts/{contact_id}/topics",
      "Contacts",
      args.contact_id,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/contacts/{contact_id}/topics", {
          contact_id: args.contact_id,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        getContactTopicsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiContactsContactIdTopics = (args: UseGetApiContactsContactIdTopicsArgs) =>
  useQuery(getApiContactsContactIdTopicsQueryOptions(args));
