import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { deleteApiKeysApiKeyId } from "./handlers/{api_key_id}";
import type { DeleteApiKeyResponse } from "packages/models/src/deleteApiKeyResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.delete(
  "/api-keys/:api_key_id",
  validate("param", z.object({ api_key_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteApiKeysApiKeyId({ db, env: c.env, user: c.var.user, params }));
  },
);

export type DeleteApiKeysApiKeyIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { api_key_id: string };
};

export type DeleteApiKeysApiKeyIdHandler = (
  input: DeleteApiKeysApiKeyIdInput,
) => Promise<DeleteApiKeyResponse>;
