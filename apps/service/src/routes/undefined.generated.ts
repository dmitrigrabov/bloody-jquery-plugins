import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import {
  sendEmailRequest,
  type SendEmailRequest,
} from "packages/models/src/sendEmailRequest.generated.ts";
import { createDb, type Db } from "../db";
import {
  postEmails,
  getEmails,
  postDomains,
  getDomains,
  postApiKeys,
  getApiKeys,
  postTemplates,
  getTemplates,
  postAudiences,
  getAudiences,
  postContacts,
  getContacts,
  postBroadcasts,
  getBroadcasts,
  postWebhooks,
  getWebhooks,
  postSegments,
  getSegments,
  postTopics,
  getTopics,
  postContactProperties,
  getContactProperties,
  getLogs,
  postAutomations,
  getAutomations,
  postEvents,
  getEvents,
  postSuppressions,
  getSuppressions,
} from "./handlers/undefined";
import type { SendEmailResponse } from "packages/models/src/sendEmailResponse.generated.ts";
import { z } from "zod";
import type { ListEmailsResponse } from "packages/models/src/listEmailsResponse.generated.ts";
import {
  createDomainRequest,
  type CreateDomainRequest,
} from "packages/models/src/createDomainRequest.generated.ts";
import type { CreateDomainResponse } from "packages/models/src/createDomainResponse.generated.ts";
import type { ListDomainsResponse } from "packages/models/src/listDomainsResponse.generated.ts";
import {
  createApiKeyRequest,
  type CreateApiKeyRequest,
} from "packages/models/src/createApiKeyRequest.generated.ts";
import type { CreateApiKeyResponse } from "packages/models/src/createApiKeyResponse.generated.ts";
import type { ListApiKeysResponse } from "packages/models/src/listApiKeysResponse.generated.ts";
import {
  createTemplateRequest,
  type CreateTemplateRequest,
} from "packages/models/src/createTemplateRequest.generated.ts";
import type { CreateTemplateResponseSuccess } from "packages/models/src/createTemplateResponseSuccess.generated.ts";
import type { ListTemplatesResponseSuccess } from "packages/models/src/listTemplatesResponseSuccess.generated.ts";
import {
  createAudienceOptions,
  type CreateAudienceOptions,
} from "packages/models/src/createAudienceOptions.generated.ts";
import type { CreateAudienceResponseSuccess } from "packages/models/src/createAudienceResponseSuccess.generated.ts";
import type { ListAudiencesResponseSuccess } from "packages/models/src/listAudiencesResponseSuccess.generated.ts";
import {
  createContactOptions,
  type CreateContactOptions,
} from "packages/models/src/createContactOptions.generated.ts";
import type { CreateContactResponseSuccess } from "packages/models/src/createContactResponseSuccess.generated.ts";
import type { ListContactsResponseSuccess } from "packages/models/src/listContactsResponseSuccess.generated.ts";
import {
  createBroadcastOptions,
  type CreateBroadcastOptions,
} from "packages/models/src/createBroadcastOptions.generated.ts";
import type { CreateBroadcastResponseSuccess } from "packages/models/src/createBroadcastResponseSuccess.generated.ts";
import type { ListBroadcastsResponseSuccess } from "packages/models/src/listBroadcastsResponseSuccess.generated.ts";
import {
  createWebhookRequest,
  type CreateWebhookRequest,
} from "packages/models/src/createWebhookRequest.generated.ts";
import type { CreateWebhookResponse } from "packages/models/src/createWebhookResponse.generated.ts";
import type { ListWebhooksResponse } from "packages/models/src/listWebhooksResponse.generated.ts";
import {
  createSegmentOptions,
  type CreateSegmentOptions,
} from "packages/models/src/createSegmentOptions.generated.ts";
import type { CreateSegmentResponseSuccess } from "packages/models/src/createSegmentResponseSuccess.generated.ts";
import type { ListSegmentsResponseSuccess } from "packages/models/src/listSegmentsResponseSuccess.generated.ts";
import {
  createTopicOptions,
  type CreateTopicOptions,
} from "packages/models/src/createTopicOptions.generated.ts";
import type { CreateTopicResponseSuccess } from "packages/models/src/createTopicResponseSuccess.generated.ts";
import type { ListTopicsResponseSuccess } from "packages/models/src/listTopicsResponseSuccess.generated.ts";
import {
  createContactPropertyOptions,
  type CreateContactPropertyOptions,
} from "packages/models/src/createContactPropertyOptions.generated.ts";
import type { CreateContactPropertyResponseSuccess } from "packages/models/src/createContactPropertyResponseSuccess.generated.ts";
import type { ListContactPropertiesResponseSuccess } from "packages/models/src/listContactPropertiesResponseSuccess.generated.ts";
import type { ListLogsResponse } from "packages/models/src/listLogsResponse.generated.ts";
import {
  createAutomationRequest,
  type CreateAutomationRequest,
} from "packages/models/src/createAutomationRequest.generated.ts";
import type { CreateAutomationResponse } from "packages/models/src/createAutomationResponse.generated.ts";
import type { ListAutomationsResponse } from "packages/models/src/listAutomationsResponse.generated.ts";
import {
  createEventRequest,
  type CreateEventRequest,
} from "packages/models/src/createEventRequest.generated.ts";
import type { CreateEventResponse } from "packages/models/src/createEventResponse.generated.ts";
import type { ListEventsResponse } from "packages/models/src/listEventsResponse.generated.ts";
import {
  createSuppressionOptions,
  type CreateSuppressionOptions,
} from "packages/models/src/createSuppressionOptions.generated.ts";
import type { CreateSuppressionResponseSuccess } from "packages/models/src/createSuppressionResponseSuccess.generated.ts";
import type { ListSuppressionsResponseSuccess } from "packages/models/src/listSuppressionsResponseSuccess.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post("/emails", validate("json", sendEmailRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postEmails({ db, env: c.env, user: c.var.user, body }));
});
app.get(
  "/emails",
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
    const query = c.req.valid("query");
    return c.json(await getEmails({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/domains", validate("json", createDomainRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postDomains({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/domains",
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
    const query = c.req.valid("query");
    return c.json(await getDomains({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/api-keys", validate("json", createApiKeyRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postApiKeys({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/api-keys",
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
    const query = c.req.valid("query");
    return c.json(await getApiKeys({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/templates", validate("json", createTemplateRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postTemplates({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/templates",
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
    const query = c.req.valid("query");
    return c.json(await getTemplates({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/audiences", validate("json", createAudienceOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postAudiences({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get("/audiences", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await getAudiences({ db, env: c.env, user: c.var.user }));
});
app.post("/contacts", validate("json", createContactOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postContacts({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/contacts",
  validate(
    "query",
    z.object({
      segment_id: z.string().optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getContacts({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/broadcasts", validate("json", createBroadcastOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postBroadcasts({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/broadcasts",
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
    const query = c.req.valid("query");
    return c.json(await getBroadcasts({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/webhooks", validate("json", createWebhookRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postWebhooks({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/webhooks",
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
    return c.json(await getWebhooks({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/segments", validate("json", createSegmentOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postSegments({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/segments",
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
    const query = c.req.valid("query");
    return c.json(await getSegments({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/topics", validate("json", createTopicOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postTopics({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/topics",
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
    const query = c.req.valid("query");
    return c.json(await getTopics({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/contact-properties", validate("json", createContactPropertyOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postContactProperties({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/contact-properties",
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
    const query = c.req.valid("query");
    return c.json(await getContactProperties({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/logs",
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
    const query = c.req.valid("query");
    return c.json(await getLogs({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/automations", validate("json", createAutomationRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postAutomations({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/automations",
  validate(
    "query",
    z.object({
      status: z.enum(["enabled", "disabled"]).optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getAutomations({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/events", validate("json", createEventRequest), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postEvents({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/events",
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
    const query = c.req.valid("query");
    return c.json(await getEvents({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/suppressions", validate("json", createSuppressionOptions), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postSuppressions({ db, env: c.env, user: c.var.user, body }), 201);
});
app.get(
  "/suppressions",
  validate(
    "query",
    z.object({
      origin: z.enum(["bounce", "complaint", "manual"]).optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      after: z.string().optional(),
      before: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getSuppressions({ db, env: c.env, user: c.var.user, query }));
  },
);

export type PostEmailsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: SendEmailRequest;
};

export type PostEmailsHandler = (input: PostEmailsInput) => Promise<SendEmailResponse>;

export type GetEmailsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetEmailsHandler = (input: GetEmailsInput) => Promise<ListEmailsResponse>;

export type PostDomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateDomainRequest;
};

export type PostDomainsHandler = (input: PostDomainsInput) => Promise<CreateDomainResponse>;

export type GetDomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetDomainsHandler = (input: GetDomainsInput) => Promise<ListDomainsResponse>;

export type PostApiKeysInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateApiKeyRequest;
};

export type PostApiKeysHandler = (input: PostApiKeysInput) => Promise<CreateApiKeyResponse>;

export type GetApiKeysInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetApiKeysHandler = (input: GetApiKeysInput) => Promise<ListApiKeysResponse>;

export type PostTemplatesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateTemplateRequest;
};

export type PostTemplatesHandler = (
  input: PostTemplatesInput,
) => Promise<CreateTemplateResponseSuccess>;

export type GetTemplatesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetTemplatesHandler = (
  input: GetTemplatesInput,
) => Promise<ListTemplatesResponseSuccess>;

export type PostAudiencesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateAudienceOptions;
};

export type PostAudiencesHandler = (
  input: PostAudiencesInput,
) => Promise<CreateAudienceResponseSuccess>;

export type GetAudiencesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
};

export type GetAudiencesHandler = (
  input: GetAudiencesInput,
) => Promise<ListAudiencesResponseSuccess>;

export type PostContactsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateContactOptions;
};

export type PostContactsHandler = (
  input: PostContactsInput,
) => Promise<CreateContactResponseSuccess>;

export type GetContactsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    segment_id?: string | undefined;
    limit?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
  };
};

export type GetContactsHandler = (input: GetContactsInput) => Promise<ListContactsResponseSuccess>;

export type PostBroadcastsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateBroadcastOptions;
};

export type PostBroadcastsHandler = (
  input: PostBroadcastsInput,
) => Promise<CreateBroadcastResponseSuccess>;

export type GetBroadcastsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetBroadcastsHandler = (
  input: GetBroadcastsInput,
) => Promise<ListBroadcastsResponseSuccess>;

export type PostWebhooksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateWebhookRequest;
};

export type PostWebhooksHandler = (input: PostWebhooksInput) => Promise<CreateWebhookResponse>;

export type GetWebhooksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetWebhooksHandler = (input: GetWebhooksInput) => Promise<ListWebhooksResponse>;

export type PostSegmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateSegmentOptions;
};

export type PostSegmentsHandler = (
  input: PostSegmentsInput,
) => Promise<CreateSegmentResponseSuccess>;

export type GetSegmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetSegmentsHandler = (input: GetSegmentsInput) => Promise<ListSegmentsResponseSuccess>;

export type PostTopicsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateTopicOptions;
};

export type PostTopicsHandler = (input: PostTopicsInput) => Promise<CreateTopicResponseSuccess>;

export type GetTopicsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetTopicsHandler = (input: GetTopicsInput) => Promise<ListTopicsResponseSuccess>;

export type PostContactPropertiesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateContactPropertyOptions;
};

export type PostContactPropertiesHandler = (
  input: PostContactPropertiesInput,
) => Promise<CreateContactPropertyResponseSuccess>;

export type GetContactPropertiesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetContactPropertiesHandler = (
  input: GetContactPropertiesInput,
) => Promise<ListContactPropertiesResponseSuccess>;

export type GetLogsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetLogsHandler = (input: GetLogsInput) => Promise<ListLogsResponse>;

export type PostAutomationsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateAutomationRequest;
};

export type PostAutomationsHandler = (
  input: PostAutomationsInput,
) => Promise<CreateAutomationResponse>;

export type GetAutomationsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    status?: ("enabled" | "disabled") | undefined;
    limit?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
  };
};

export type GetAutomationsHandler = (
  input: GetAutomationsInput,
) => Promise<ListAutomationsResponse>;

export type PostEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateEventRequest;
};

export type PostEventsHandler = (input: PostEventsInput) => Promise<CreateEventResponse>;

export type GetEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; after?: string | undefined; before?: string | undefined };
};

export type GetEventsHandler = (input: GetEventsInput) => Promise<ListEventsResponse>;

export type PostSuppressionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: CreateSuppressionOptions;
};

export type PostSuppressionsHandler = (
  input: PostSuppressionsInput,
) => Promise<CreateSuppressionResponseSuccess>;

export type GetSuppressionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    origin?: ("bounce" | "complaint" | "manual") | undefined;
    limit?: number | undefined;
    after?: string | undefined;
    before?: string | undefined;
  };
};

export type GetSuppressionsHandler = (
  input: GetSuppressionsInput,
) => Promise<ListSuppressionsResponseSuccess>;
