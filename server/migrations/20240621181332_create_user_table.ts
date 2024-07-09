import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("username").unique();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("avatar_url");
    table.enu("status", ["online", "offline"]).defaultTo("offline");
    table.timestamp("last_login");
    table.string("solana_wallet_address", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
