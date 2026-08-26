import { email } from "packages/models/src/email.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiEmailsEmailIdArgs = { email_id: string };

export const getApiEmailsEmailIdQueryOptions = (args: UseGetApiEmailsEmailIdArgs) =>
  queryOptions({
    queryKey: ["GET /emails/{email_id}", "Emails", args.email_id],
    queryFn: () =>
      apiFetch(buildUrl("/emails/{email_id}", { email_id: args.email_id }), email, {
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

export const useGetApiEmailsEmailId = (args: UseGetApiEmailsEmailIdArgs) =>
  useQuery(getApiEmailsEmailIdQueryOptions(args));
