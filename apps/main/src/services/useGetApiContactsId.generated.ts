import { getContactResponseSuccess } from "packages/models/src/getContactResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactsIdArgs = { id: string };

export const getApiContactsIdQueryOptions = (args: UseGetApiContactsIdArgs) =>
  queryOptions({
    queryKey: ["GET /contacts/{id}", "Contacts", args.id],
    queryFn: () =>
      apiFetch(buildUrl("/contacts/{id}", { id: args.id }), getContactResponseSuccess, {
        method: "GET",
      }),
  });

export const useGetApiContactsId = (args: UseGetApiContactsIdArgs) =>
  useQuery(getApiContactsIdQueryOptions(args));
