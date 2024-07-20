import type { Knex } from "knex";

// from: userId,
// to: recipient.id,
// amount: values.amount,
// signature: signature,

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("solana_transaction", (table) => {
    table.increments("id").primary();
    table
      .integer("from")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("to")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.decimal("amount", 18, 8).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("signature", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("solana_transaction");
}
