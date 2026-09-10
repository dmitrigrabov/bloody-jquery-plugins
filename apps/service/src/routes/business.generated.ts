import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getIndividualsBusinessDetailsNinoList,
  getIndividualsBusinessDetailsNinoBusinessId,
  putIndividualsBusinessDetailsNinoBusinessIdTaxYear,
  getIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElection,
  postIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapply,
  deleteIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdraw,
} from "./handlers/business";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/individuals/business/details/:nino/list",
  validate("param", z.object({ nino: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getIndividualsBusinessDetailsNinoList({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.get(
  "/individuals/business/details/:nino/:businessId",
  validate(
    "param",
    z.object({ nino: z.string(), businessId: z.string().regex(/^X[A-Z0-9]{1}IS[0-9]{11}$/) }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getIndividualsBusinessDetailsNinoBusinessId({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.put(
  "/individuals/business/details/:nino/:businessId/:taxYear",
  validate(
    "param",
    z.object({
      nino: z.string(),
      businessId: z.string().regex(/^X[A-Z0-9]{1}IS[0-9]{11}$/),
      taxYear: z.string().regex(/^2[0-9]{3}-[0-9]{2}$/),
    }),
  ),
  validate("json", putIndividualsBusinessDetailsNinoBusinessIdTaxYearBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    await putIndividualsBusinessDetailsNinoBusinessIdTaxYear({
      db,
      env: c.env,
      user: c.var.user,
      params,
      body,
    });
    return c.body(null, 204);
  },
);
app.get(
  "/individuals/business/details/:nino/:businessId/:taxYear/late-accounting-date-rule-election",
  validate(
    "param",
    z.object({
      nino: z.string(),
      businessId: z.string().regex(/^X[A-Z0-9]{1}IS[0-9]{11}$/),
      taxYear: z.string().regex(/^2[0-9]{3}-[0-9]{2}$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElection({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.post(
  "/individuals/business/details/:nino/:businessId/:taxYear/late-accounting-date-rule-election/disapply",
  validate(
    "param",
    z.object({
      nino: z.string(),
      businessId: z.string().regex(/^X[A-Z0-9]{1}IS[0-9]{11}$/),
      taxYear: z.string().regex(/^2[0-9]{3}-[0-9]{2}$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await postIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapply(
      { db, env: c.env, user: c.var.user, params },
    );
    return c.body(null, 204);
  },
);
app.delete(
  "/individuals/business/details/:nino/:businessId/:taxYear/late-accounting-date-rule-election/withdraw",
  validate(
    "param",
    z.object({
      nino: z.string(),
      businessId: z.string().regex(/^X[A-Z0-9]{1}IS[0-9]{11}$/),
      taxYear: z.string().regex(/^2[0-9]{3}-[0-9]{2}$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await deleteIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdraw(
      { db, env: c.env, user: c.var.user, params },
    );
    return c.body(null, 204);
  },
);

export type GetIndividualsBusinessDetailsNinoListResponse = {
  listOfBusinesses: Array<{
    typeOfBusiness: "self-employment" | "uk-property" | "foreign-property" | "property-unspecified";
    businessId: string;
    tradingType?: string | undefined;
    tradingName?: string | undefined;
  }>;
};

export type GetIndividualsBusinessDetailsNinoListInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { nino: string };
};

export type GetIndividualsBusinessDetailsNinoListHandler = (
  input: GetIndividualsBusinessDetailsNinoListInput,
) => Promise<GetIndividualsBusinessDetailsNinoListResponse>;

export type GetIndividualsBusinessDetailsNinoBusinessIdResponse = {
  businessId: string;
  typeOfBusiness: "self-employment" | "uk-property" | "foreign-property" | "property-unspecified";
  tradingType?: string | undefined;
  tradingName?: string | undefined;
  yearOfMigration?: unknown | undefined;
  firstAccountingPeriodStartDate?: string | undefined;
  firstAccountingPeriodEndDate?: string | undefined;
  latencyDetails?:
    | {
        latencyEndDate: string;
        taxYear1: unknown;
        latencyIndicator1: "A" | "Q";
        taxYear2: unknown;
        latencyIndicator2: "A" | "Q";
      }
    | undefined;
  quarterlyTypeChoice?:
    | { quarterlyPeriodType: "standard" | "calendar"; taxYearOfChoice: string }
    | undefined;
  accountingPeriods?: Array<{ start: string; end: string }> | undefined;
  commencementDate?: string | undefined;
  cessationDate?: string | undefined;
  businessAddressLineOne?: string | undefined;
  businessAddressLineTwo?: string | undefined;
  businessAddressLineThree?: string | undefined;
  businessAddressLineFour?: string | undefined;
  businessAddressPostcode?: string | undefined;
  businessAddressCountryCode?: string | undefined;
};

export type GetIndividualsBusinessDetailsNinoBusinessIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { nino: string; businessId: string };
};

export type GetIndividualsBusinessDetailsNinoBusinessIdHandler = (
  input: GetIndividualsBusinessDetailsNinoBusinessIdInput,
) => Promise<GetIndividualsBusinessDetailsNinoBusinessIdResponse>;

export const putIndividualsBusinessDetailsNinoBusinessIdTaxYearBody = z.object({
  quarterlyPeriodType: z.enum(["standard", "calendar"]),
});

export type PutIndividualsBusinessDetailsNinoBusinessIdTaxYearBody = {
  quarterlyPeriodType: "standard" | "calendar";
};

export type PutIndividualsBusinessDetailsNinoBusinessIdTaxYearInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { nino: string; businessId: string; taxYear: string };
  body: PutIndividualsBusinessDetailsNinoBusinessIdTaxYearBody;
};

export type PutIndividualsBusinessDetailsNinoBusinessIdTaxYearHandler = (
  input: PutIndividualsBusinessDetailsNinoBusinessIdTaxYearInput,
) => Promise<void>;

export type GetIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionResponse =
  {
    disapply: boolean;
    eligible: boolean;
    taxYearOfElection?: unknown | undefined;
    taxYearElectionExpires?: unknown | undefined;
  };

export type GetIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { nino: string; businessId: string; taxYear: string };
  };

export type GetIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionHandler =
  (
    input: GetIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionInput,
  ) => Promise<GetIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionResponse>;

export type PostIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { nino: string; businessId: string; taxYear: string };
  };

export type PostIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyHandler =
  (
    input: PostIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionDisapplyInput,
  ) => Promise<void>;

export type DeleteIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { nino: string; businessId: string; taxYear: string };
  };

export type DeleteIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawHandler =
  (
    input: DeleteIndividualsBusinessDetailsNinoBusinessIdTaxYearLateAccountingDateRuleElectionWithdrawInput,
  ) => Promise<void>;
