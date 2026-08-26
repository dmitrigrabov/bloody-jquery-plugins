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
  getWebhooksWebhookIdEvents,
  getWebhooksWebhookIdEventsEventId,
  getWebhooksWebhookIdEventsEventIdAttempts,
} from "./handlers/{webhook_id}";
import type { GetWebhookResponse } from "packages/models/src/getWebhookResponse.generated.ts";
import {
  updateWebhookRequest,
  type UpdateWebhookRequest,
} from "packages/models/src/updateWebhookRequest.generated.ts";
import type { UpdateWebhookResponse } from "packages/models/src/updateWebhookResponse.generated.ts";
import type { DeleteWebhookResponse } from "packages/models/src/deleteWebhookResponse.generated.ts";
import type { ListWebhookEventsResponse } from "packages/models/src/listWebhookEventsResponse.generated.ts";
import type { GetWebhookEventResponse } from "packages/models/src/getWebhookEventResponse.generated.ts";
import type { ListWebhookEventAttemptsResponse } from "packages/models/src/listWebhookEventAttemptsResponse.generated.ts";

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
app.get(
  "/webhooks/:webhook_id/events",
  validate("param", z.object({ webhook_id: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getWebhooksWebhookIdEvents({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/webhooks/:webhook_id/events/:event_id",
  validate("param", z.object({ webhook_id: z.string(), event_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getWebhooksWebhookIdEventsEventId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.get(
  "/webhooks/:webhook_id/events/:event_id/attempts",
  validate("param", z.object({ webhook_id: z.string(), event_id: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getWebhooksWebhookIdEventsEventIdAttempts({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
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

export type GetWebhooksWebhookIdEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { webhook_id: string };
  query: { limit?: number | undefined; after?: string | undefined };
};

export type GetWebhooksWebhookIdEventsHandler = (
  input: GetWebhooksWebhookIdEventsInput,
) => Promise<ListWebhookEventsResponse>;

export type GetWebhooksWebhookIdEventsEventIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { webhook_id: string; event_id: string };
};

export type GetWebhooksWebhookIdEventsEventIdHandler = (
  input: GetWebhooksWebhookIdEventsEventIdInput,
) => Promise<GetWebhookEventResponse>;

export type GetWebhooksWebhookIdEventsEventIdAttemptsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { webhook_id: string; event_id: string };
  query: { limit?: number | undefined; after?: string | undefined };
};

export type GetWebhooksWebhookIdEventsEventIdAttemptsHandler = (
  input: GetWebhooksWebhookIdEventsEventIdAttemptsInput,
) => Promise<ListWebhookEventAttemptsResponse>;
