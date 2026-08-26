import { automation } from "packages/models/src/automation.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiAutomationsAutomationIdArgs = { automation_id: string };

export const getApiAutomationsAutomationIdQueryOptions = (
  args: UseGetApiAutomationsAutomationIdArgs,
) =>
  queryOptions({
    queryKey: ["GET /automations/{automation_id}", "Automations", args.automation_id],
    queryFn: () =>
      apiFetch(
        buildUrl("/automations/{automation_id}", { automation_id: args.automation_id }),
        automation,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiAutomationsAutomationId = (args: UseGetApiAutomationsAutomationIdArgs) =>
  useQuery(getApiAutomationsAutomationIdQueryOptions(args));
