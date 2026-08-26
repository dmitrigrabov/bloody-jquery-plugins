import { event } from "packages/models/src/event.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEventsIdentifierArgs = { identifier: string };

export const getApiEventsIdentifierQueryOptions = (args: UseGetApiEventsIdentifierArgs) =>
  queryOptions({
    queryKey: ["GET /events/{identifier}", "Events", args.identifier],
    queryFn: () =>
      apiFetch(buildUrl("/events/{identifier}", { identifier: args.identifier }), event, {
        method: "GET",
      }),
  });

export const useGetApiEventsIdentifier = (args: UseGetApiEventsIdentifierArgs) =>
  useQuery(getApiEventsIdentifierQueryOptions(args));
