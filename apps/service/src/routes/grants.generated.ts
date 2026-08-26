import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { getOauthGrants, deleteOauthGrantsOauthGrantId } from "./handlers/grants";
import type { ListOAuthGrantsResponse } from "packages/models/src/listOAuthGrantsResponse.generated.ts";
import type { RevokeOAuthGrantResponse } from "packages/models/src/revokeOAuthGrantResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/oauth/grants",
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getOauthGrants({ db, env: c.env, user: c.var.user, query }));
  },
);
app.delete(
  "/oauth/grants/:oauth_grant_id",
  validate("param", z.object({ oauth_grant_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteOauthGrantsOauthGrantId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);

export type GetOauthGrantsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetOauthGrantsHandler = (
  input: GetOauthGrantsInput,
) => Promise<ListOAuthGrantsResponse>;

export type DeleteOauthGrantsOauthGrantIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { oauth_grant_id: string };
};

export type DeleteOauthGrantsOauthGrantIdHandler = (
  input: DeleteOauthGrantsOauthGrantIdInput,
) => Promise<RevokeOAuthGrantResponse>;
