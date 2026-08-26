import { getContactImportResponseSuccess } from "packages/models/src/getContactImportResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactsImportsIdArgs = { id: string };

export const getApiContactsImportsIdQueryOptions = (args: UseGetApiContactsImportsIdArgs) =>
  queryOptions({
    queryKey: ["GET /contacts/imports/{id}", "Contacts", args.id],
    queryFn: () =>
      apiFetch(
        buildUrl("/contacts/imports/{id}", { id: args.id }),
        getContactImportResponseSuccess,
        { method: "GET" },
      ),
  });

export const useGetApiContactsImportsId = (args: UseGetApiContactsImportsIdArgs) =>
  useQuery(getApiContactsImportsIdQueryOptions(args));
