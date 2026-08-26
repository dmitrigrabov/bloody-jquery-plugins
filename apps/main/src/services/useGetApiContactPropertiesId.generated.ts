import { getContactPropertyResponseSuccess } from "packages/models/src/getContactPropertyResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiContactPropertiesIdArgs = { id: string };

export const getApiContactPropertiesIdQueryOptions = (args: UseGetApiContactPropertiesIdArgs) =>
  queryOptions({
    queryKey: ["GET /contact-properties/{id}", "Contact Properties", args.id],
    queryFn: () =>
      apiFetch(
        buildUrl("/contact-properties/{id}", { id: args.id }),
        getContactPropertyResponseSuccess,
        { method: "GET" },
      ),
  });

export const useGetApiContactPropertiesId = (args: UseGetApiContactPropertiesIdArgs) =>
  useQuery(getApiContactPropertiesIdQueryOptions(args));
