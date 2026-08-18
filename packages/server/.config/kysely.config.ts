import { defineConfig } from "kysely-ctl";
import { db } from "../src/database/connection.ts";

export default defineConfig({
  kysely: db,

  migrations: {
    migrationFolder: "../src/database/migrations",
  },
});
