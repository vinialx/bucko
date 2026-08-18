import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`CREATE SCHEMA IF NOT EXISTS bucko`.execute(db);

  await sql`CREATE TYPE bucko.log_level AS ENUM (
    'SUCCESS',
    'INFO',
    'DEBUG',
    'WARNING',
    'ERROR',
    'FATAL'
)`.execute(db);

  await sql`CREATE TYPE bucko.transaction_direction AS ENUM (
    'INCOME',
    'EXPENSE')`.execute(db);

  await sql`
    CREATE TYPE bucko.transaction_payment_method AS ENUM (
    'DEBIT_CARD',
    'CREDIT_CARD',
    'PIX',
    'CASH',
    'TRANSFER',
    'BANK_SLIP'
    )`.execute(db);

  await sql`
    CREATE TABLE bucko.accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    name text NOT NULL,
    balance_cents int NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
    )`.execute(db);

  await sql`
CREATE TABLE bucko.transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    name text NOT NULL,
    value_cents int NOT NULL,
    payment_method bucko.transaction_payment_method NOT NULL,
    direction bucko.transaction_direction NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    account_id uuid NOT NULL,
    CONSTRAINT transaction_account_id_fk FOREIGN KEY (account_id) REFERENCES bucko.accounts (id) ON DELETE CASCADE ON UPDATE CASCADE
)`.execute(db);

  await sql`
CREATE TABLE bucko.cards (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    account_id uuid NOT NULL,
    CONSTRAINT card_account_id_fk FOREIGN KEY (account_id) REFERENCES bucko.accounts (id) ON DELETE CASCADE ON UPDATE CASCADE
)`.execute(db);

  await sql`
CREATE TABLE bucko.logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    level bucko.log_level NOT NULL,
    event text NOT NULL,
    status int NOT NULL,
    message text NOT NULL,
    url text NOT NULL,
    ip text NOT NULL,
    payload jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
)`.execute(db);
}
