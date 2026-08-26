import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import {
  updateApiKeyRequest,
  type UpdateApiKeyRequest,
} from "packages/models/src/updateApiKeyRequest.generated.ts";
import { createDb, type Db } from "../db";
import { patchApiKeysApiKeyId, deleteApiKeysApiKeyId } from "./handlers/{api_key_id}";
import type { UpdateApiKeyResponse } from "packages/models/src/updateApiKeyResponse.generated.ts";
import type { DeleteApiKeyResponse } from "packages/models/src/deleteApiKeyResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.patch(
  "/api-keys/:api_key_id",
  validate("param", z.object({ api_key_id: z.string() })),
  validate("json", updateApiKeyRequest),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchApiKeysApiKeyId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete(
  "/api-keys/:api_key_id",
  validate("param", z.object({ api_key_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteApiKeysApiKeyId({ db, env: c.env, user: c.var.user, params }));
  },
);

export type PatchApiKeysApiKeyIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { api_key_id: string };
  body: UpdateApiKeyRequest;
};

export type PatchApiKeysApiKeyIdHandler = (
  input: PatchApiKeysApiKeyIdInput,
) => Promise<UpdateApiKeyResponse>;

export type DeleteApiKeysApiKeyIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { api_key_id: string };
};

export type DeleteApiKeysApiKeyIdHandler = (
  input: DeleteApiKeysApiKeyIdInput,
) => Promise<DeleteApiKeyResponse>;
