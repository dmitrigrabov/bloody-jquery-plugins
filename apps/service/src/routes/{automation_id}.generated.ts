import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getAutomationsAutomationId,
  patchAutomationsAutomationId,
  deleteAutomationsAutomationId,
  postAutomationsAutomationIdStop,
  getAutomationsAutomationIdRuns,
  getAutomationsAutomationIdRunsRunId,
} from "./handlers/{automation_id}";
import type { Automation } from "packages/models/src/automation.generated.ts";
import {
  patchAutomationRequest,
  type PatchAutomationRequest,
} from "packages/models/src/patchAutomationRequest.generated.ts";
import type { PatchAutomationResponse } from "packages/models/src/patchAutomationResponse.generated.ts";
import type { DeleteAutomationResponse } from "packages/models/src/deleteAutomationResponse.generated.ts";
import type { StopAutomationResponse } from "packages/models/src/stopAutomationResponse.generated.ts";
import type { ListAutomationRunsResponse } from "packages/models/src/listAutomationRunsResponse.generated.ts";
import type { AutomationRun } from "packages/models/src/automationRun.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/automations/:automation_id",
  validate("param", z.object({ automation_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getAutomationsAutomationId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.patch(
  "/automations/:automation_id",
  validate("param", z.object({ automation_id: z.string() })),
  validate("json", patchAutomationRequest),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchAutomationsAutomationId({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.delete(
  "/automations/:automation_id",
  validate("param", z.object({ automation_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteAutomationsAutomationId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.post(
  "/automations/:automation_id/stop",
  validate("param", z.object({ automation_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await postAutomationsAutomationIdStop({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.get(
  "/automations/:automation_id/runs",
  validate("param", z.object({ automation_id: z.string() })),
  validate(
    "query",
    z.object({
      status: z.string().optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getAutomationsAutomationIdRuns({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/automations/:automation_id/runs/:run_id",
  validate("param", z.object({ automation_id: z.string(), run_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getAutomationsAutomationIdRunsRunId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);

export type GetAutomationsAutomationIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { automation_id: string };
};

export type GetAutomationsAutomationIdHandler = (
  input: GetAutomationsAutomationIdInput,
) => Promise<Automation>;

export type PatchAutomationsAutomationIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { automation_id: string };
  body: PatchAutomationRequest;
};

export type PatchAutomationsAutomationIdHandler = (
  input: PatchAutomationsAutomationIdInput,
) => Promise<PatchAutomationResponse>;

export type DeleteAutomationsAutomationIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { automation_id: string };
};

export type DeleteAutomationsAutomationIdHandler = (
  input: DeleteAutomationsAutomationIdInput,
) => Promise<DeleteAutomationResponse>;

export type PostAutomationsAutomationIdStopInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { automation_id: string };
};

export type PostAutomationsAutomationIdStopHandler = (
  input: PostAutomationsAutomationIdStopInput,
) => Promise<StopAutomationResponse>;

export type GetAutomationsAutomationIdRunsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { automation_id: string };
  query: {
    status?: string | undefined;
    limit?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
  };
};

export type GetAutomationsAutomationIdRunsHandler = (
  input: GetAutomationsAutomationIdRunsInput,
) => Promise<ListAutomationRunsResponse>;

export type GetAutomationsAutomationIdRunsRunIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { automation_id: string; run_id: string };
};

export type GetAutomationsAutomationIdRunsRunIdHandler = (
  input: GetAutomationsAutomationIdRunsRunIdInput,
) => Promise<AutomationRun>;
