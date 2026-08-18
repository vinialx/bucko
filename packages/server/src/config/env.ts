import { z } from "zod";

const schema = z.object({
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_DB: z.string().default("bucko"),
  POSTGRES_HOST: z.string().default("127.0.0.1"),
  POSTGRES_PORT: z.coerce.number().default(5432),
});

export const env = schema.parse(process.env);
export const databaseUrl =
  `postgresql://${encodeURIComponent(env.POSTGRES_USER)}:` +
  `${encodeURIComponent(env.POSTGRES_PASSWORD)}` +
  `@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;
