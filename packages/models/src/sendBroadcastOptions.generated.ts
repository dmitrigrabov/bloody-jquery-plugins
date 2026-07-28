import { z } from "zod";

export type SendBroadcastOptions = { scheduled_at?: string | undefined };

export const sendBroadcastOptions = z.object({ scheduled_at: z.string().optional() });
