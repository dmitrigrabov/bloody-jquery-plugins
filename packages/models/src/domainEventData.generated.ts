import {
  type WebhookDomainRecord,
  webhookDomainRecord,
} from "packages/models/src/webhookDomainRecord.generated.ts";
import { z } from "zod";

export type DomainEventData = {
  id: string;
  name: string;
  status:
    | "verified"
    | "partially_verified"
    | "partially_failed"
    | "failed"
    | "pending"
    | "not_started";
  created_at: string;
  region: "us-east-1" | "eu-west-1" | "sa-east-1" | "ap-northeast-1";
  records: Array<WebhookDomainRecord>;
};

export const domainEventData = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum([
    "verified",
    "partially_verified",
    "partially_failed",
    "failed",
    "pending",
    "not_started",
  ]),
  created_at: z.string(),
  region: z.enum(["us-east-1", "eu-west-1", "sa-east-1", "ap-northeast-1"]),
  records: z.array(webhookDomainRecord),
});
