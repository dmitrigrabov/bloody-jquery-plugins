import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { getLogsLogId } from "./handlers/{log_id}";
import type { Log } from "packages/models/src/log.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get("/logs/:log_id", validate("param", z.object({ log_id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getLogsLogId({ db, env: c.env, user: c.var.user, params }));
});

export type GetLogsLogIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { log_id: string };
};

export type GetLogsLogIdHandler = (input: GetLogsLogIdInput) => Promise<Log>;
