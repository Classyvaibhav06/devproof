import { neon } from "@neondatabase/serverless";

// Fallback prevents next build / static analysis from failing when env vars are not set at build time
const databaseUrl =
  process.env.DATABASE_URL || "postgresql://devproof:devproof@localhost:5432/devproof";

export const sql = neon(databaseUrl);

export async function query<T = unknown>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required at runtime");
  }
  return sql(strings, ...values) as Promise<T[]>;
}
