import { template } from "packages/models/src/template.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiTemplatesIdArgs = { id: string };

export const getApiTemplatesIdQueryOptions = (args: UseGetApiTemplatesIdArgs) =>
  queryOptions({
    queryKey: ["GET /templates/{id}", "Templates", args.id],
    queryFn: () =>
      apiFetch(buildUrl("/templates/{id}", { id: args.id }), template, { method: "GET" }),
    placeholderData: keepPreviousData,
  });

export const useGetApiTemplatesId = (args: UseGetApiTemplatesIdArgs) =>
  useQuery(getApiTemplatesIdQueryOptions(args));
