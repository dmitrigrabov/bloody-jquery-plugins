import { z } from "zod";

export type SendBroadcastResponseSuccess = { id?: string | undefined };

export const sendBroadcastResponseSuccess = z.object({ id: z.string().optional() });
