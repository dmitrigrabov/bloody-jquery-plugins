import { listAutomationRunsResponse } from "packages/models/src/listAutomationRunsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiAutomationsAutomationIdRunsArgs = {
  automation_id: string;
  status?: string | undefined;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiAutomationsAutomationIdRunsQueryOptions = (
  args: UseGetApiAutomationsAutomationIdRunsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /automations/{automation_id}/runs",
      "Automations",
      args.automation_id,
      args.status,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/automations/{automation_id}/runs", {
          automation_id: args.automation_id,
          status: args.status,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listAutomationRunsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiAutomationsAutomationIdRuns = (
  args: UseGetApiAutomationsAutomationIdRunsArgs,
) => useQuery(getApiAutomationsAutomationIdRunsQueryOptions(args));
