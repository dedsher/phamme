import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("reel_comments", (table) => {
    table.increments("id").primary();
    table
      .integer("reel_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("reel")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reel_comments");
}
