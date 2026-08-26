import { listContactPropertiesResponseSuccess } from "packages/models/src/listContactPropertiesResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactPropertiesArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiContactPropertiesQueryOptions = (args: UseGetApiContactPropertiesArgs) =>
  queryOptions({
    queryKey: [
      "GET /contact-properties",
      "Contact Properties",
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/contact-properties", {
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listContactPropertiesResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiContactProperties = (args: UseGetApiContactPropertiesArgs) =>
  useQuery(getApiContactPropertiesQueryOptions(args));
