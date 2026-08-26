import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getEventsIdentifier,
  patchEventsIdentifier,
  deleteEventsIdentifier,
} from "./handlers/{identifier}";
import type { Event } from "packages/models/src/event.generated.ts";
import {
  updateEventRequest,
  type UpdateEventRequest,
} from "packages/models/src/updateEventRequest.generated.ts";
import type { UpdateEventResponse } from "packages/models/src/updateEventResponse.generated.ts";
import type { RemoveEventResponse } from "packages/models/src/removeEventResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/events/:identifier",
  validate("param", z.object({ identifier: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getEventsIdentifier({ db, env: c.env, user: c.var.user, params }));
  },
);
app.patch(
  "/events/:identifier",
  validate("param", z.object({ identifier: z.string() })),
  validate("json", updateEventRequest),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchEventsIdentifier({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete(
  "/events/:identifier",
  validate("param", z.object({ identifier: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteEventsIdentifier({ db, env: c.env, user: c.var.user, params }));
  },
);

export type GetEventsIdentifierInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { identifier: string };
};

export type GetEventsIdentifierHandler = (input: GetEventsIdentifierInput) => Promise<Event>;

export type PatchEventsIdentifierInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { identifier: string };
  body: UpdateEventRequest;
};

export type PatchEventsIdentifierHandler = (
  input: PatchEventsIdentifierInput,
) => Promise<UpdateEventResponse>;

export type DeleteEventsIdentifierInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { identifier: string };
};

export type DeleteEventsIdentifierHandler = (
  input: DeleteEventsIdentifierInput,
) => Promise<RemoveEventResponse>;
