import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/devproof",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "default_devproof_secret_must_change_in_production_32chars",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24,       // update if older than 1 day
  },
  user: {
    additionalFields: {
      username: { type: "string", required: false },
      bio: { type: "string", required: false },
      github_username: { type: "string", required: false },
      leetcode_username: { type: "string", required: false },
      xp: { type: "number", required: false, defaultValue: 0 },
      streak: { type: "number", required: false, defaultValue: 0 },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
