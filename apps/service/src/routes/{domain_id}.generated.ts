import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getDomainsDomainId,
  patchDomainsDomainId,
  deleteDomainsDomainId,
  postDomainsDomainIdVerify,
  getDomainsDomainIdClaim,
  postDomainsDomainIdClaimVerify,
} from "./handlers/{domain_id}";
import type { Domain } from "packages/models/src/domain.generated.ts";
import {
  updateDomainOptions,
  type UpdateDomainOptions,
} from "packages/models/src/updateDomainOptions.generated.ts";
import type { UpdateDomainResponseSuccess } from "packages/models/src/updateDomainResponseSuccess.generated.ts";
import type { DeleteDomainResponse } from "packages/models/src/deleteDomainResponse.generated.ts";
import type { VerifyDomainResponse } from "packages/models/src/verifyDomainResponse.generated.ts";
import type { DomainClaim } from "packages/models/src/domainClaim.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/domains/:domain_id",
  validate("param", z.object({ domain_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getDomainsDomainId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.patch(
  "/domains/:domain_id",
  validate("param", z.object({ domain_id: z.string() })),
  validate("json", updateDomainOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchDomainsDomainId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete(
  "/domains/:domain_id",
  validate("param", z.object({ domain_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteDomainsDomainId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.post(
  "/domains/:domain_id/verify",
  validate("param", z.object({ domain_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await postDomainsDomainIdVerify({ db, env: c.env, user: c.var.user, params }));
  },
);
app.get(
  "/domains/:domain_id/claim",
  validate("param", z.object({ domain_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getDomainsDomainIdClaim({ db, env: c.env, user: c.var.user, params }));
  },
);
app.post(
  "/domains/:domain_id/claim/verify",
  validate("param", z.object({ domain_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await postDomainsDomainIdClaimVerify({ db, env: c.env, user: c.var.user, params }),
    );
  },
);

export type GetDomainsDomainIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain_id: string };
};

export type GetDomainsDomainIdHandler = (input: GetDomainsDomainIdInput) => Promise<Domain>;

export type PatchDomainsDomainIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain_id: string };
  body: UpdateDomainOptions;
};

export type PatchDomainsDomainIdHandler = (
  input: PatchDomainsDomainIdInput,
) => Promise<UpdateDomainResponseSuccess>;

export type DeleteDomainsDomainIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain_id: string };
};

export type DeleteDomainsDomainIdHandler = (
  input: DeleteDomainsDomainIdInput,
) => Promise<DeleteDomainResponse>;

export type PostDomainsDomainIdVerifyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain_id: string };
};

export type PostDomainsDomainIdVerifyHandler = (
  input: PostDomainsDomainIdVerifyInput,
) => Promise<VerifyDomainResponse>;

export type GetDomainsDomainIdClaimInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain_id: string };
};

export type GetDomainsDomainIdClaimHandler = (
  input: GetDomainsDomainIdClaimInput,
) => Promise<DomainClaim>;

export type PostDomainsDomainIdClaimVerifyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain_id: string };
};

export type PostDomainsDomainIdClaimVerifyHandler = (
  input: PostDomainsDomainIdClaimVerifyInput,
) => Promise<DomainClaim>;
