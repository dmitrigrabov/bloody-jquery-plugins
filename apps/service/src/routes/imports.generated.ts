import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, errors, isFormFile, validate } from "./errors";
import { createDb, type Db } from "../db";
import { postContactsImports, getContactsImports, getContactsImportsId } from "./handlers/imports";
import type { CreateContactImportResponseSuccess } from "packages/models/src/createContactImportResponseSuccess.generated.ts";
import { z } from "zod";
import type { ListContactImportsResponseSuccess } from "packages/models/src/listContactImportsResponseSuccess.generated.ts";
import type { GetContactImportResponseSuccess } from "packages/models/src/getContactImportResponseSuccess.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post("/contacts/imports", async (c) => {
  const db = createDb(c.env.DB);
  const form = await c.req.formData();
  const fileRaw = form.get("file") as unknown;
  if (!isFormFile(fileRaw)) {
    throw errors.unprocessable('multipart field "file" is required and must be a file');
  }
  const file = await fileRaw.arrayBuffer();
  return c.json(await postContactsImports({ db, env: c.env, user: c.var.user, file }), 201);
});
app.get(
  "/contacts/imports",
  validate(
    "query",
    z.object({
      status: z.enum(["queued", "in_progress", "completed", "failed"]).optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getContactsImports({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get("/contacts/imports/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getContactsImportsId({ db, env: c.env, user: c.var.user, params }));
});

export type PostContactsImportsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  file: ArrayBuffer;
};

export type PostContactsImportsHandler = (
  input: PostContactsImportsInput,
) => Promise<CreateContactImportResponseSuccess>;

export type GetContactsImportsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    status?: ("queued" | "in_progress" | "completed" | "failed") | undefined;
    limit?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
  };
};

export type GetContactsImportsHandler = (
  input: GetContactsImportsInput,
) => Promise<ListContactImportsResponseSuccess>;

export type GetContactsImportsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetContactsImportsIdHandler = (
  input: GetContactsImportsIdInput,
) => Promise<GetContactImportResponseSuccess>;
