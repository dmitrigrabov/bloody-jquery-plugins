import { listAutomationsResponse } from "packages/models/src/listAutomationsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiAutomationsArgs = {
  status?: ("enabled" | "disabled") | undefined;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiAutomationsQueryOptions = (args: UseGetApiAutomationsArgs) =>
  queryOptions({
    queryKey: ["GET /automations", "Automations", args.status, args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/automations", {
          status: args.status,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listAutomationsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiAutomations = (args: UseGetApiAutomationsArgs) =>
  useQuery(getApiAutomationsQueryOptions(args));
