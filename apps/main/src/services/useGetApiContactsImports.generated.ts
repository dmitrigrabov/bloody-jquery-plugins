import { listContactImportsResponseSuccess } from "packages/models/src/listContactImportsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactsImportsArgs = {
  status?: ("queued" | "in_progress" | "completed" | "failed") | undefined;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiContactsImportsQueryOptions = (args: UseGetApiContactsImportsArgs) =>
  queryOptions({
    queryKey: [
      "GET /contacts/imports",
      "Contacts",
      args.status,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/contacts/imports", {
          status: args.status,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listContactImportsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiContactsImports = (args: UseGetApiContactsImportsArgs) =>
  useQuery(getApiContactsImportsQueryOptions(args));
