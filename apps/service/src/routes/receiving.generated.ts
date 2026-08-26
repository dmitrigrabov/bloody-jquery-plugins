import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getEmailsReceiving,
  getEmailsReceivingEmailId,
  getEmailsReceivingEmailIdAttachments,
  getEmailsReceivingEmailIdAttachmentsAttachmentId,
} from "./handlers/receiving";
import type { ListReceivedEmailsResponse } from "packages/models/src/listReceivedEmailsResponse.generated.ts";
import type { GetReceivedEmailResponse } from "packages/models/src/getReceivedEmailResponse.generated.ts";
import type { ListAttachmentsResponse } from "packages/models/src/listAttachmentsResponse.generated.ts";
import type { RetrievedAttachment } from "packages/models/src/retrievedAttachment.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/emails/receiving",
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getEmailsReceiving({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/emails/receiving/:email_id",
  validate("param", z.object({ email_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getEmailsReceivingEmailId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.get(
  "/emails/receiving/:email_id/attachments",
  validate("param", z.object({ email_id: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getEmailsReceivingEmailIdAttachments({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/emails/receiving/:email_id/attachments/:attachment_id",
  validate("param", z.object({ email_id: z.string(), attachment_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getEmailsReceivingEmailIdAttachmentsAttachmentId({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);

export type GetEmailsReceivingInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetEmailsReceivingHandler = (
  input: GetEmailsReceivingInput,
) => Promise<ListReceivedEmailsResponse>;

export type GetEmailsReceivingEmailIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
};

export type GetEmailsReceivingEmailIdHandler = (
  input: GetEmailsReceivingEmailIdInput,
) => Promise<GetReceivedEmailResponse>;

export type GetEmailsReceivingEmailIdAttachmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetEmailsReceivingEmailIdAttachmentsHandler = (
  input: GetEmailsReceivingEmailIdAttachmentsInput,
) => Promise<ListAttachmentsResponse>;

export type GetEmailsReceivingEmailIdAttachmentsAttachmentIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string; attachment_id: string };
};

export type GetEmailsReceivingEmailIdAttachmentsAttachmentIdHandler = (
  input: GetEmailsReceivingEmailIdAttachmentsAttachmentIdInput,
) => Promise<RetrievedAttachment>;
