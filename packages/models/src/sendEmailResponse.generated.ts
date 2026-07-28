import { z } from "zod";

export type SendEmailResponse = { id?: string | undefined };

export const sendEmailResponse = z.object({ id: z.string().optional() });
