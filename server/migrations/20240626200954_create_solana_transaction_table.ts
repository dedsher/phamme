import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("solana_transaction", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.string("transaction_id", 255).notNullable().unique();
    table.decimal("amount", 18, 8).notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
    table.enu("status", ["pending", "confirmed", "failed"]).notNullable();
    table.jsonb("details");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("solana_transaction");
}
