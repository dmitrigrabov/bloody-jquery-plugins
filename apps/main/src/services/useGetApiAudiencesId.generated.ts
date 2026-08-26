import { getAudienceResponseSuccess } from "packages/models/src/getAudienceResponseSuccess.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiAudiencesIdArgs = { id: string };

export const getApiAudiencesIdQueryOptions = (args: UseGetApiAudiencesIdArgs) =>
  queryOptions({
    queryKey: ["GET /audiences/{id}", "Audiences", args.id],
    queryFn: () =>
      apiFetch(buildUrl("/audiences/{id}", { id: args.id }), getAudienceResponseSuccess, {
        method: "GET",
      }),
  });

export const useGetApiAudiencesId = (args: UseGetApiAudiencesIdArgs) =>
  useQuery(getApiAudiencesIdQueryOptions(args));
