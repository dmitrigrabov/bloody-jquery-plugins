import { listLogsResponse } from "packages/models/src/listLogsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiLogsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiLogsQueryOptions = (args: UseGetApiLogsArgs) =>
  queryOptions({
    queryKey: ["GET /logs", "Logs", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/logs", { limit: args.limit, after: args.after, before: args.before }),
        listLogsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiLogs = (args: UseGetApiLogsArgs) => useQuery(getApiLogsQueryOptions(args));
