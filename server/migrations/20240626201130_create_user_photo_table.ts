import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_photo", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.timestamp("uploaded_at").defaultTo(knex.fn.now());
    table.string("photo_url", 255).notNullable();
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_photo");
}
