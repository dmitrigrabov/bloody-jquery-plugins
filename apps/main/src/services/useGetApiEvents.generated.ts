import { listEventsResponse } from "packages/models/src/listEventsResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEventsArgs = {
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiEventsQueryOptions = (args: UseGetApiEventsArgs) =>
  queryOptions({
    queryKey: ["GET /events", "Events", args.limit, args.after, args.before],
    queryFn: () =>
      apiFetch(
        buildUrl("/events", { limit: args.limit, after: args.after, before: args.before }),
        listEventsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiEvents = (args: UseGetApiEventsArgs) =>
  useQuery(getApiEventsQueryOptions(args));
