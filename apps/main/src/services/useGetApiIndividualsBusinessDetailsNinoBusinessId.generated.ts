import {z} from 'zod'
import {useQuery, queryOptions, keepPreviousData} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export const useGetApiIndividualsBusinessDetailsNinoBusinessIdResponse = z.object({businessId: z.string().regex(/^X[a-zA-Z0-9]{1}IS[0-9]{11}$/), typeOfBusiness: z.enum(["self-employment", "uk-property", "foreign-property", "property-unspecified"]), tradingType: z.string().min(1).max(35).optional(), tradingName: z.string().max(105).optional(), yearOfMigration: z.string().regex(/^(\d{4})$/).optional(), firstAccountingPeriodStartDate: z.string().optional(), firstAccountingPeriodEndDate: z.string().optional(), latencyDetails: z.object({latencyEndDate: z.string(), taxYear1: z.string().min(7).max(7), latencyIndicator1: z.enum(["A", "Q"]), taxYear2: z.string().min(7).max(7), latencyIndicator2: z.enum(["A", "Q"])}).optional(), quarterlyTypeChoice: z.object({quarterlyPeriodType: z.enum(["standard", "calendar"]), taxYearOfChoice: z.string().regex(/^2[0-9]{3}-[0-9]{2}$/)}).optional(), accountingPeriods: z.array(z.object({start: z.string(), end: z.string()})).optional(), commencementDate: z.string().optional(), cessationDate: z.string().optional(), businessAddressLineOne: z.string().min(1).max(35).optional(), businessAddressLineTwo: z.string().min(1).max(35).optional(), businessAddressLineThree: z.string().min(1).max(35).optional(), businessAddressLineFour: z.string().min(1).max(35).optional(), businessAddressPostcode: z.string().min(1).max(10).optional(), businessAddressCountryCode: z.string().optional()});

export type UseGetApiIndividualsBusinessDetailsNinoBusinessIdArgs = {nino: string, businessId: string, Accept: 'application/vnd.hmrc.2.0+json', Authorization: string, 'Gov-Test-Scenario'?: string | undefined};

export const getApiIndividualsBusinessDetailsNinoBusinessIdQueryOptions = (args: UseGetApiIndividualsBusinessDetailsNinoBusinessIdArgs) =>
      queryOptions({
        queryKey: ['GET /individuals/business/details/{nino}/{businessId}', args.nino, args.businessId, args.Accept, args.Authorization, args.'Gov-Test-Scenario'],
        queryFn: () => apiFetch(buildUrl('/individuals/business/details/{nino}/{businessId}', { nino: args.nino, businessId: args.businessId }), useGetApiIndividualsBusinessDetailsNinoBusinessIdResponse, { method: 'GET' }),
        placeholderData: keepPreviousData
      });

export const useGetApiIndividualsBusinessDetailsNinoBusinessId = (args: UseGetApiIndividualsBusinessDetailsNinoBusinessIdArgs) => useQuery(getApiIndividualsBusinessDetailsNinoBusinessIdQueryOptions(args));
