import { listAudiencesResponseSuccess } from "packages/models/src/listAudiencesResponseSuccess.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseGetApiAudiencesArgs = Record<string, never>;

export const getApiAudiencesQueryOptions = () =>
  queryOptions({
    queryKey: ["GET /audiences", "Audiences"],
    queryFn: () => apiFetch("/audiences", listAudiencesResponseSuccess, { method: "GET" }),
    placeholderData: keepPreviousData,
  });

export const useGetApiAudiences = () => useQuery(getApiAudiencesQueryOptions());
