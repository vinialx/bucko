import { databaseUrl } from "../config/env";

import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

interface Database {}

console.log(databaseUrl);

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: databaseUrl,
    }),
  }),
});
