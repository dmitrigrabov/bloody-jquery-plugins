import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getEmailsEmailId,
  patchEmailsEmailId,
  postEmailsEmailIdCancel,
  postEmailsEmailIdShare,
  getEmailsEmailIdAttachments,
  getEmailsEmailIdAttachmentsAttachmentId,
} from "./handlers/{email_id}";
import type { Email } from "packages/models/src/email.generated.ts";
import type { UpdateEmailOptions } from "packages/models/src/updateEmailOptions.generated.ts";
import {
  shareEmailOptions,
  type ShareEmailOptions,
} from "packages/models/src/shareEmailOptions.generated.ts";
import type { ShareEmailResponse } from "packages/models/src/shareEmailResponse.generated.ts";
import type { ListAttachmentsResponse } from "packages/models/src/listAttachmentsResponse.generated.ts";
import type { RetrievedAttachment } from "packages/models/src/retrievedAttachment.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get("/emails/:email_id", validate("param", z.object({ email_id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getEmailsEmailId({ db, env: c.env, user: c.var.user, params }));
});
app.patch("/emails/:email_id", validate("param", z.object({ email_id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await patchEmailsEmailId({ db, env: c.env, user: c.var.user, params }));
});
app.post(
  "/emails/:email_id/cancel",
  validate("param", z.object({ email_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await postEmailsEmailIdCancel({ db, env: c.env, user: c.var.user, params }));
  },
);
app.post(
  "/emails/:email_id/share",
  validate("param", z.object({ email_id: z.string() })),
  validate("json", shareEmailOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await postEmailsEmailIdShare({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.get(
  "/emails/:email_id/attachments",
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
      await getEmailsEmailIdAttachments({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/emails/:email_id/attachments/:attachment_id",
  validate("param", z.object({ email_id: z.string(), attachment_id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getEmailsEmailIdAttachmentsAttachmentId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);

export type GetEmailsEmailIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
};

export type GetEmailsEmailIdHandler = (input: GetEmailsEmailIdInput) => Promise<Email>;

export type PatchEmailsEmailIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
};

export type PatchEmailsEmailIdHandler = (
  input: PatchEmailsEmailIdInput,
) => Promise<UpdateEmailOptions>;

export type PostEmailsEmailIdCancelInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
};

export type PostEmailsEmailIdCancelHandler = (
  input: PostEmailsEmailIdCancelInput,
) => Promise<Email>;

export type PostEmailsEmailIdShareInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
  body: ShareEmailOptions;
};

export type PostEmailsEmailIdShareHandler = (
  input: PostEmailsEmailIdShareInput,
) => Promise<ShareEmailResponse>;

export type GetEmailsEmailIdAttachmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string };
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetEmailsEmailIdAttachmentsHandler = (
  input: GetEmailsEmailIdAttachmentsInput,
) => Promise<ListAttachmentsResponse>;

export type GetEmailsEmailIdAttachmentsAttachmentIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { email_id: string; attachment_id: string };
};

export type GetEmailsEmailIdAttachmentsAttachmentIdHandler = (
  input: GetEmailsEmailIdAttachmentsAttachmentIdInput,
) => Promise<RetrievedAttachment>;
