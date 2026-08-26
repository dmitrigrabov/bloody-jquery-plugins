import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import {
  sendEmailRequest,
  type SendEmailRequest,
} from "packages/models/src/sendEmailRequest.generated.ts";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postEmailsBatch,
  postSuppressionsBatchAdd,
  postSuppressionsBatchRemove,
} from "./handlers/batch";
import type { CreateBatchEmailsResponse } from "packages/models/src/createBatchEmailsResponse.generated.ts";
import {
  batchAddSuppressionsOptions,
  type BatchAddSuppressionsOptions,
} from "packages/models/src/batchAddSuppressionsOptions.generated.ts";
import type { BatchAddSuppressionsResponseSuccess } from "packages/models/src/batchAddSuppressionsResponseSuccess.generated.ts";
import {
  batchRemoveSuppressionsOptions,
  type BatchRemoveSuppressionsOptions,
} from "packages/models/src/batchRemoveSuppressionsOptions.generated.ts";
import type { BatchRemoveSuppressionsResponseSuccess } from "packages/models/src/batchRemoveSuppressionsResponseSuccess.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post("/emails/batch", validate("json", postEmailsBatchBody), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postEmailsBatch({ db, env: c.env, user: c.var.user, body }));
});
app.post("/suppressions/batch/add", validate("json", batchAddSuppressionsOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postSuppressionsBatchAdd({ db, env: c.env, user: c.var.user, body }), 201);
});
app.post(
  "/suppressions/batch/remove",
  validate("json", batchRemoveSuppressionsOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const body = c.req.valid("json");
    return c.json(await postSuppressionsBatchRemove({ db, env: c.env, user: c.var.user, body }));
  },
);

export const postEmailsBatchBody = z.array(sendEmailRequest);

export type PostEmailsBatchBody = Array<SendEmailRequest>;

export type PostEmailsBatchInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: PostEmailsBatchBody;
};

export type PostEmailsBatchHandler = (
  input: PostEmailsBatchInput,
) => Promise<CreateBatchEmailsResponse>;

export type PostSuppressionsBatchAddInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: BatchAddSuppressionsOptions;
};

export type PostSuppressionsBatchAddHandler = (
  input: PostSuppressionsBatchAddInput,
) => Promise<BatchAddSuppressionsResponseSuccess>;

export type PostSuppressionsBatchRemoveInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: BatchRemoveSuppressionsOptions;
};

export type PostSuppressionsBatchRemoveHandler = (
  input: PostSuppressionsBatchRemoveInput,
) => Promise<BatchRemoveSuppressionsResponseSuccess>;
