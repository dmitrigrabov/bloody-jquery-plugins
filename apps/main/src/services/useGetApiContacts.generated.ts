import { listContactsResponseSuccess } from "packages/models/src/listContactsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactsArgs = {
  segment_id?: string | undefined;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiContactsQueryOptions = (args: UseGetApiContactsArgs) =>
  queryOptions({
    queryKey: ["GET /contacts", "Contacts", args.segment_id, args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/contacts", {
          segment_id: args.segment_id,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listContactsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiContacts = (args: UseGetApiContactsArgs) =>
  useQuery(getApiContactsQueryOptions(args));
