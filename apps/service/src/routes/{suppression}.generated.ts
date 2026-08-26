import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getSuppressionsSuppression,
  deleteSuppressionsSuppression,
} from "./handlers/{suppression}";
import type { GetSuppressionResponseSuccess } from "packages/models/src/getSuppressionResponseSuccess.generated.ts";
import type { RemoveSuppressionResponseSuccess } from "packages/models/src/removeSuppressionResponseSuccess.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/suppressions/:suppression",
  validate("param", z.object({ suppression: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getSuppressionsSuppression({ db, env: c.env, user: c.var.user, params }));
  },
);
app.delete(
  "/suppressions/:suppression",
  validate("param", z.object({ suppression: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteSuppressionsSuppression({ db, env: c.env, user: c.var.user, params }),
    );
  },
);

export type GetSuppressionsSuppressionInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { suppression: string };
};

export type GetSuppressionsSuppressionHandler = (
  input: GetSuppressionsSuppressionInput,
) => Promise<GetSuppressionResponseSuccess>;

export type DeleteSuppressionsSuppressionInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { suppression: string };
};

export type DeleteSuppressionsSuppressionHandler = (
  input: DeleteSuppressionsSuppressionInput,
) => Promise<RemoveSuppressionResponseSuccess>;
