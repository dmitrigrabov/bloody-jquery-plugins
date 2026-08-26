import { listTemplatesResponseSuccess } from "packages/models/src/listTemplatesResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiTemplatesArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiTemplatesQueryOptions = (args: UseGetApiTemplatesArgs) =>
  queryOptions({
    queryKey: ["GET /templates", "Templates", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/templates", { limit: args.limit, after: args.after, before: args.before }),
        listTemplatesResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiTemplates = (args: UseGetApiTemplatesArgs) =>
  useQuery(getApiTemplatesQueryOptions(args));
