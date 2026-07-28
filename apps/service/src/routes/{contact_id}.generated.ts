import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getContactsContactIdSegments,
  postContactsContactIdSegmentsSegmentId,
  deleteContactsContactIdSegmentsSegmentId,
  getContactsContactIdTopics,
  patchContactsContactIdTopics,
} from "./handlers/{contact_id}";
import type { ListContactSegmentsResponseSuccess } from "packages/models/src/listContactSegmentsResponseSuccess.generated.ts";
import type { AddContactToSegmentResponseSuccess } from "packages/models/src/addContactToSegmentResponseSuccess.generated.ts";
import type { RemoveContactFromSegmentResponseSuccess } from "packages/models/src/removeContactFromSegmentResponseSuccess.generated.ts";
import type { GetContactTopicsResponseSuccess } from "packages/models/src/getContactTopicsResponseSuccess.generated.ts";
import {
  updateContactTopicsOptions,
  type UpdateContactTopicsOptions,
} from "packages/models/src/updateContactTopicsOptions.generated.ts";
import type { UpdateContactTopicsResponseSuccess } from "packages/models/src/updateContactTopicsResponseSuccess.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/contacts/:contact_id/segments",
  validate("param", z.object({ contact_id: z.string() })),
  validate(
    "query",
    z.object({
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
      await getContactsContactIdSegments({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/contacts/:contact_id/segments/:segment_id",
  validate("param", z.object({ contact_id: z.string(), segment_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await postContactsContactIdSegmentsSegmentId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.delete(
  "/contacts/:contact_id/segments/:segment_id",
  validate("param", z.object({ contact_id: z.string(), segment_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteContactsContactIdSegmentsSegmentId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.get(
  "/contacts/:contact_id/topics",
  validate("param", z.object({ contact_id: z.string() })),
  validate(
    "query",
    z.object({
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
      await getContactsContactIdTopics({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.patch(
  "/contacts/:contact_id/topics",
  validate("param", z.object({ contact_id: z.string() })),
  validate("json", updateContactTopicsOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchContactsContactIdTopics({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);

export type GetContactsContactIdSegmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { contact_id: string };
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetContactsContactIdSegmentsHandler = (
  input: GetContactsContactIdSegmentsInput,
) => Promise<ListContactSegmentsResponseSuccess>;

export type PostContactsContactIdSegmentsSegmentIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { contact_id: string; segment_id: string };
};

export type PostContactsContactIdSegmentsSegmentIdHandler = (
  input: PostContactsContactIdSegmentsSegmentIdInput,
) => Promise<AddContactToSegmentResponseSuccess>;

export type DeleteContactsContactIdSegmentsSegmentIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { contact_id: string; segment_id: string };
};

export type DeleteContactsContactIdSegmentsSegmentIdHandler = (
  input: DeleteContactsContactIdSegmentsSegmentIdInput,
) => Promise<RemoveContactFromSegmentResponseSuccess>;

export type GetContactsContactIdTopicsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { contact_id: string };
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetContactsContactIdTopicsHandler = (
  input: GetContactsContactIdTopicsInput,
) => Promise<GetContactTopicsResponseSuccess>;

export type PatchContactsContactIdTopicsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { contact_id: string };
  body: UpdateContactTopicsOptions;
};

export type PatchContactsContactIdTopicsHandler = (
  input: PatchContactsContactIdTopicsInput,
) => Promise<UpdateContactTopicsResponseSuccess>;
