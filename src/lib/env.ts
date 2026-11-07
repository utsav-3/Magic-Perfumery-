import { z } from "zod";

/**
 * Typed, validated environment. Import `env` instead of reading process.env
 * so a missing or malformed variable fails fast at startup, not at runtime.
 * Add every new key here and to .env.example.
 */
const blankToUndefined = (v: unknown) => (v === "" ? undefined : v);

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  /** Digits only, with country code, e.g. 919876543210. Optional. */
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.preprocess(
    blankToUndefined,
    z
      .string()
      .regex(/^\d{8,15}$/, "Use digits only, including country code (e.g. 919876543210)")
      .optional(),
  ),
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
});
