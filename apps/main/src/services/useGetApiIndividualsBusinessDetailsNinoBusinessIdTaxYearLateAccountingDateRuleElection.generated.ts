import {z} from 'zod'
import {useQuery, queryOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseGetApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionArgs = {nino: string, businessId: string, taxYear: string, Accept: 'application/vnd.hmrc.2.0+json', Authorization: string, 'Gov-Test-Scenario'?: string | undefined};

export const useGetApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionResponse = z.object({disapply: z.boolean(), eligible: z.boolean(), taxYearOfElection: z.string().optional(), taxYearElectionExpires: z.string().optional()});

export const getApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionQueryOptions = (args: UseGetApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionArgs) =>
      queryOptions({
        queryKey: ['GET /individuals/business/details/{nino}/{businessId}/{taxYear}/late-accounting-date-rule-election', 'Late Accounting Date Rule', args.nino, args.businessId, args.taxYear, args.Accept, args.Authorization, args.'Gov-Test-Scenario'],
        queryFn: () => apiFetch(buildUrl('/individuals/business/details/{nino}/{businessId}/{taxYear}/late-accounting-date-rule-election', { nino: args.nino, businessId: args.businessId, taxYear: args.taxYear }), useGetApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionResponse, { method: 'GET' })
      });

export const useGetApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElection = (args: UseGetApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionArgs) => useQuery(getApiIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionQueryOptions(args));
