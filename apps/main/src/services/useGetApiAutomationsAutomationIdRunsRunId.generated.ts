import { automationRun } from "packages/models/src/automationRun.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiAutomationsAutomationIdRunsRunIdArgs = {
  automation_id: string;
  run_id: string;
};

export const getApiAutomationsAutomationIdRunsRunIdQueryOptions = (
  args: UseGetApiAutomationsAutomationIdRunsRunIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /automations/{automation_id}/runs/{run_id}",
      "Automations",
      args.automation_id,
      args.run_id,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/automations/{automation_id}/runs/{run_id}", {
          automation_id: args.automation_id,
          run_id: args.run_id,
        }),
        automationRun,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiAutomationsAutomationIdRunsRunId = (
  args: UseGetApiAutomationsAutomationIdRunsRunIdArgs,
) => useQuery(getApiAutomationsAutomationIdRunsRunIdQueryOptions(args));
