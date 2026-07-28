import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getTemplatesId,
  patchTemplatesId,
  deleteTemplatesId,
  postTemplatesIdPublish,
  postTemplatesIdDuplicate,
  deleteAudiencesId,
  getAudiencesId,
  getContactsId,
  patchContactsId,
  deleteContactsId,
  deleteBroadcastsId,
  getBroadcastsId,
  patchBroadcastsId,
  postBroadcastsIdSend,
  getSegmentsId,
  deleteSegmentsId,
  getTopicsId,
  patchTopicsId,
  deleteTopicsId,
  getContactPropertiesId,
  patchContactPropertiesId,
  deleteContactPropertiesId,
} from "./handlers/{id}";
import type { Template } from "packages/models/src/template.generated.ts";
import {
  updateTemplateOptions,
  type UpdateTemplateOptions,
} from "packages/models/src/updateTemplateOptions.generated.ts";
import type { UpdateTemplateResponseSuccess } from "packages/models/src/updateTemplateResponseSuccess.generated.ts";
import type { RemoveTemplateResponseSuccess } from "packages/models/src/removeTemplateResponseSuccess.generated.ts";
import type { PublishTemplateResponseSuccess } from "packages/models/src/publishTemplateResponseSuccess.generated.ts";
import type { DuplicateTemplateResponseSuccess } from "packages/models/src/duplicateTemplateResponseSuccess.generated.ts";
import type { RemoveAudienceResponseSuccess } from "packages/models/src/removeAudienceResponseSuccess.generated.ts";
import type { GetAudienceResponseSuccess } from "packages/models/src/getAudienceResponseSuccess.generated.ts";
import type { GetContactResponseSuccess } from "packages/models/src/getContactResponseSuccess.generated.ts";
import {
  updateContactOptions,
  type UpdateContactOptions,
} from "packages/models/src/updateContactOptions.generated.ts";
import type { UpdateContactResponseSuccess } from "packages/models/src/updateContactResponseSuccess.generated.ts";
import type { RemoveContactResponseSuccess } from "packages/models/src/removeContactResponseSuccess.generated.ts";
import type { RemoveBroadcastResponseSuccess } from "packages/models/src/removeBroadcastResponseSuccess.generated.ts";
import type { GetBroadcastResponseSuccess } from "packages/models/src/getBroadcastResponseSuccess.generated.ts";
import {
  updateBroadcastOptions,
  type UpdateBroadcastOptions,
} from "packages/models/src/updateBroadcastOptions.generated.ts";
import type { UpdateBroadcastResponseSuccess } from "packages/models/src/updateBroadcastResponseSuccess.generated.ts";
import {
  sendBroadcastOptions,
  type SendBroadcastOptions,
} from "packages/models/src/sendBroadcastOptions.generated.ts";
import type { SendBroadcastResponseSuccess } from "packages/models/src/sendBroadcastResponseSuccess.generated.ts";
import type { GetSegmentResponseSuccess } from "packages/models/src/getSegmentResponseSuccess.generated.ts";
import type { RemoveSegmentResponseSuccess } from "packages/models/src/removeSegmentResponseSuccess.generated.ts";
import type { GetTopicResponseSuccess } from "packages/models/src/getTopicResponseSuccess.generated.ts";
import {
  updateTopicOptions,
  type UpdateTopicOptions,
} from "packages/models/src/updateTopicOptions.generated.ts";
import type { UpdateTopicResponseSuccess } from "packages/models/src/updateTopicResponseSuccess.generated.ts";
import type { RemoveTopicResponseSuccess } from "packages/models/src/removeTopicResponseSuccess.generated.ts";
import type { GetContactPropertyResponseSuccess } from "packages/models/src/getContactPropertyResponseSuccess.generated.ts";
import {
  updateContactPropertyOptions,
  type UpdateContactPropertyOptions,
} from "packages/models/src/updateContactPropertyOptions.generated.ts";
import type { UpdateContactPropertyResponseSuccess } from "packages/models/src/updateContactPropertyResponseSuccess.generated.ts";
import type { RemoveContactPropertyResponseSuccess } from "packages/models/src/removeContactPropertyResponseSuccess.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get("/templates/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getTemplatesId({ db, env: c.env, user: c.var.user, params }));
});
app.patch(
  "/templates/:id",
  validate("param", z.object({ id: z.string() })),
  validate("json", updateTemplateOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchTemplatesId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete("/templates/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await deleteTemplatesId({ db, env: c.env, user: c.var.user, params }));
});
app.post("/templates/:id/publish", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await postTemplatesIdPublish({ db, env: c.env, user: c.var.user, params }));
});
app.post("/templates/:id/duplicate", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await postTemplatesIdDuplicate({ db, env: c.env, user: c.var.user, params }));
});
app.delete("/audiences/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await deleteAudiencesId({ db, env: c.env, user: c.var.user, params }));
});
app.get("/audiences/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getAudiencesId({ db, env: c.env, user: c.var.user, params }));
});
app.get("/contacts/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getContactsId({ db, env: c.env, user: c.var.user, params }));
});
app.patch(
  "/contacts/:id",
  validate("param", z.object({ id: z.string() })),
  validate("json", updateContactOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchContactsId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete("/contacts/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await deleteContactsId({ db, env: c.env, user: c.var.user, params }));
});
app.delete("/broadcasts/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await deleteBroadcastsId({ db, env: c.env, user: c.var.user, params }));
});
app.get("/broadcasts/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getBroadcastsId({ db, env: c.env, user: c.var.user, params }));
});
app.patch(
  "/broadcasts/:id",
  validate("param", z.object({ id: z.string() })),
  validate("json", updateBroadcastOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchBroadcastsId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.post(
  "/broadcasts/:id/send",
  validate("param", z.object({ id: z.string() })),
  validate("json", sendBroadcastOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await postBroadcastsIdSend({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.get("/segments/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getSegmentsId({ db, env: c.env, user: c.var.user, params }));
});
app.delete("/segments/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await deleteSegmentsId({ db, env: c.env, user: c.var.user, params }));
});
app.get("/topics/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getTopicsId({ db, env: c.env, user: c.var.user, params }));
});
app.patch(
  "/topics/:id",
  validate("param", z.object({ id: z.string() })),
  validate("json", updateTopicOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(await patchTopicsId({ db, env: c.env, user: c.var.user, params, body }));
  },
);
app.delete("/topics/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await deleteTopicsId({ db, env: c.env, user: c.var.user, params }));
});
app.get("/contact-properties/:id", validate("param", z.object({ id: z.string() })), async (c) => {
  const db = createDb(c.env.DB);
  const params = c.req.valid("param");
  return c.json(await getContactPropertiesId({ db, env: c.env, user: c.var.user, params }));
});
app.patch(
  "/contact-properties/:id",
  validate("param", z.object({ id: z.string() })),
  validate("json", updateContactPropertyOptions),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchContactPropertiesId({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.delete(
  "/contact-properties/:id",
  validate("param", z.object({ id: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteContactPropertiesId({ db, env: c.env, user: c.var.user, params }));
  },
);

export type GetTemplatesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetTemplatesIdHandler = (input: GetTemplatesIdInput) => Promise<Template>;

export type PatchTemplatesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  body: UpdateTemplateOptions;
};

export type PatchTemplatesIdHandler = (
  input: PatchTemplatesIdInput,
) => Promise<UpdateTemplateResponseSuccess>;

export type DeleteTemplatesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteTemplatesIdHandler = (
  input: DeleteTemplatesIdInput,
) => Promise<RemoveTemplateResponseSuccess>;

export type PostTemplatesIdPublishInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type PostTemplatesIdPublishHandler = (
  input: PostTemplatesIdPublishInput,
) => Promise<PublishTemplateResponseSuccess>;

export type PostTemplatesIdDuplicateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type PostTemplatesIdDuplicateHandler = (
  input: PostTemplatesIdDuplicateInput,
) => Promise<DuplicateTemplateResponseSuccess>;

export type DeleteAudiencesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteAudiencesIdHandler = (
  input: DeleteAudiencesIdInput,
) => Promise<RemoveAudienceResponseSuccess>;

export type GetAudiencesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetAudiencesIdHandler = (
  input: GetAudiencesIdInput,
) => Promise<GetAudienceResponseSuccess>;

export type GetContactsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetContactsIdHandler = (
  input: GetContactsIdInput,
) => Promise<GetContactResponseSuccess>;

export type PatchContactsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  body: UpdateContactOptions;
};

export type PatchContactsIdHandler = (
  input: PatchContactsIdInput,
) => Promise<UpdateContactResponseSuccess>;

export type DeleteContactsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteContactsIdHandler = (
  input: DeleteContactsIdInput,
) => Promise<RemoveContactResponseSuccess>;

export type DeleteBroadcastsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteBroadcastsIdHandler = (
  input: DeleteBroadcastsIdInput,
) => Promise<RemoveBroadcastResponseSuccess>;

export type GetBroadcastsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetBroadcastsIdHandler = (
  input: GetBroadcastsIdInput,
) => Promise<GetBroadcastResponseSuccess>;

export type PatchBroadcastsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  body: UpdateBroadcastOptions;
};

export type PatchBroadcastsIdHandler = (
  input: PatchBroadcastsIdInput,
) => Promise<UpdateBroadcastResponseSuccess>;

export type PostBroadcastsIdSendInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  body: SendBroadcastOptions;
};

export type PostBroadcastsIdSendHandler = (
  input: PostBroadcastsIdSendInput,
) => Promise<SendBroadcastResponseSuccess>;

export type GetSegmentsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetSegmentsIdHandler = (
  input: GetSegmentsIdInput,
) => Promise<GetSegmentResponseSuccess>;

export type DeleteSegmentsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteSegmentsIdHandler = (
  input: DeleteSegmentsIdInput,
) => Promise<RemoveSegmentResponseSuccess>;

export type GetTopicsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetTopicsIdHandler = (input: GetTopicsIdInput) => Promise<GetTopicResponseSuccess>;

export type PatchTopicsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  body: UpdateTopicOptions;
};

export type PatchTopicsIdHandler = (
  input: PatchTopicsIdInput,
) => Promise<UpdateTopicResponseSuccess>;

export type DeleteTopicsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteTopicsIdHandler = (
  input: DeleteTopicsIdInput,
) => Promise<RemoveTopicResponseSuccess>;

export type GetContactPropertiesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type GetContactPropertiesIdHandler = (
  input: GetContactPropertiesIdInput,
) => Promise<GetContactPropertyResponseSuccess>;

export type PatchContactPropertiesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  body: UpdateContactPropertyOptions;
};

export type PatchContactPropertiesIdHandler = (
  input: PatchContactPropertiesIdInput,
) => Promise<UpdateContactPropertyResponseSuccess>;

export type DeleteContactPropertiesIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
};

export type DeleteContactPropertiesIdHandler = (
  input: DeleteContactPropertiesIdInput,
) => Promise<RemoveContactPropertyResponseSuccess>;
