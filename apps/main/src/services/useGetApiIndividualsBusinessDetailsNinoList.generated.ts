import {z} from 'zod'
import {useQuery, queryOptions, keepPreviousData} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export const useGetApiIndividualsBusinessDetailsNinoListResponse = z.object({listOfBusinesses: z.array(z.object({typeOfBusiness: z.enum(["self-employment", "uk-property", "foreign-property", "property-unspecified"]), businessId: z.string().regex(/^X[a-zA-Z0-9]{1}IS[0-9]{11}$/), tradingType: z.string().min(1).max(35).optional(), tradingName: z.string().max(105).optional()}))});

export type UseGetApiIndividualsBusinessDetailsNinoListArgs = {nino: string, Accept: 'application/vnd.hmrc.2.0+json', Authorization: string, 'Gov-Test-Scenario'?: string | undefined};

export const getApiIndividualsBusinessDetailsNinoListQueryOptions = (args: UseGetApiIndividualsBusinessDetailsNinoListArgs) =>
      queryOptions({
        queryKey: ['GET /individuals/business/details/{nino}/list', args.nino, args.Accept, args.Authorization, args.'Gov-Test-Scenario'],
        queryFn: () => apiFetch(buildUrl('/individuals/business/details/{nino}/list', { nino: args.nino }), useGetApiIndividualsBusinessDetailsNinoListResponse, { method: 'GET' }),
        placeholderData: keepPreviousData
      });

export const useGetApiIndividualsBusinessDetailsNinoList = (args: UseGetApiIndividualsBusinessDetailsNinoListArgs) => useQuery(getApiIndividualsBusinessDetailsNinoListQueryOptions(args));
