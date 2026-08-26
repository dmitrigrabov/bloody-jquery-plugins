import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import {
  sendEventRequest,
  type SendEventRequest,
} from "packages/models/src/sendEventRequest.generated.ts";
import { createDb, type Db } from "../db";
import { postEventsSend } from "./handlers/send";
import type { SendEventResponse } from "packages/models/src/sendEventResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post("/events/send", validate("json", sendEventRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postEventsSend({ db, env: c.env, user: c.var.user, body }));
});

export type PostEventsSendInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: SendEventRequest;
};

export type PostEventsSendHandler = (input: PostEventsSendInput) => Promise<SendEventResponse>;
