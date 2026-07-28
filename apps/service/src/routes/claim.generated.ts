import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import {
  createDomainClaimRequest,
  type CreateDomainClaimRequest,
} from "packages/models/src/createDomainClaimRequest.generated.ts";
import { createDb, type Db } from "../db";
import { postDomainsClaim } from "./handlers/claim";
import type { DomainClaim } from "packages/models/src/domainClaim.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post("/domains/claim", validate("json", createDomainClaimRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postDomainsClaim({ db, env: c.env, user: c.var.user, body }));
});

export type PostDomainsClaimInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateDomainClaimRequest;
};

export type PostDomainsClaimHandler = (input: PostDomainsClaimInput) => Promise<DomainClaim>;
