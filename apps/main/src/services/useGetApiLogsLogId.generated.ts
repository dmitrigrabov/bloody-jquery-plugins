import { log } from "packages/models/src/log.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiLogsLogIdArgs = { log_id: string };

export const getApiLogsLogIdQueryOptions = (args: UseGetApiLogsLogIdArgs) =>
  queryOptions({
    queryKey: ["GET /logs/{log_id}", "Logs", args.log_id],
    queryFn: () =>
      apiFetch(buildUrl("/logs/{log_id}", { log_id: args.log_id }), log, { method: "GET" }),
  });

export const useGetApiLogsLogId = (args: UseGetApiLogsLogIdArgs) =>
  useQuery(getApiLogsLogIdQueryOptions(args));
