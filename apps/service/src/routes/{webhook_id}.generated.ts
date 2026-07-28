import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getWebhooksWebhookId,
  patchWebhooksWebhookId,
  deleteWebhooksWebhookId,
} from "./handlers/{webhook_id}";
import type { GetWebhookResponse } from "packages/models/src/getWebhookResponse.generated.ts";
import {
  updateWebhookRequest,
  type UpdateWebhookRequest,
} from "packages/models/src/updateWebhookRequest.generated.ts";
import type { UpdateWebhookResponse } from "packages/models/src/updateWebhookResponse.generated.ts";
import type { DeleteWebhookResponse } from "packages/models/src/deleteWebhookResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/webhooks/:webhook_id",
  validate("param", z.object({ webhook_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getWebhooksWebhookId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.patch(
  "/webhooks/:webhook_id",
  validate("param", z.object({ webhook_id: z.string() })),
  validate("json", updateWebhookRequest),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchWebhooksWebhookId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete(
  "/webhooks/:webhook_id",
  validate("param", z.object({ webhook_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteWebhooksWebhookId({ db, env: c.env, user: c.var.user, params }));
  },
);

export type GetWebhooksWebhookIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { webhook_id: string };
};

export type GetWebhooksWebhookIdHandler = (
  input: GetWebhooksWebhookIdInput,
) => Promise<GetWebhookResponse>;

export type PatchWebhooksWebhookIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { webhook_id: string };
  body: UpdateWebhookRequest;
};

export type PatchWebhooksWebhookIdHandler = (
  input: PatchWebhooksWebhookIdInput,
) => Promise<UpdateWebhookResponse>;

export type DeleteWebhooksWebhookIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { webhook_id: string };
};

export type DeleteWebhooksWebhookIdHandler = (
  input: DeleteWebhooksWebhookIdInput,
) => Promise<DeleteWebhookResponse>;
