import { listBroadcastRecipientsResponseSuccess } from "packages/models/src/listBroadcastRecipientsResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiBroadcastsIdRecipientsArgs = {
  id: string;
  type:
    | "sent"
    | "delivered"
    | "opened"
    | "clicked"
    | "bounced"
    | "complained"
    | "unsubscribed"
    | "suppressed";
  email?: string | undefined;
  bounce_type?: ("permanent" | "transient" | "undetermined") | undefined;
  limit?: number | undefined;
  after?: string | undefined;
  before?: string | undefined;
};

export const getApiBroadcastsIdRecipientsQueryOptions = (
  args: UseGetApiBroadcastsIdRecipientsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /broadcasts/{id}/recipients",
      "Broadcasts",
      args.id,
      args.type,
      args.email,
      args.bounce_type,
      args.limit,
      args.after,
      args.before,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/broadcasts/{id}/recipients", {
          id: args.id,
          type: args.type,
          email: args.email,
          bounce_type: args.bounce_type,
          limit: args.limit,
          after: args.after,
          before: args.before,
        }),
        listBroadcastRecipientsResponseSuccess,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiBroadcastsIdRecipients = (args: UseGetApiBroadcastsIdRecipientsArgs) =>
  useQuery(getApiBroadcastsIdRecipientsQueryOptions(args));
