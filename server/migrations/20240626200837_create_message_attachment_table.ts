import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("message_attachments", (table) => {
    table.increments("id").primary();
    table.integer("message_id").unsigned().notNullable();
    table.string("url").notNullable();
    table.string("name").notNullable();
    table.string("type").notNullable();
    table.foreign("message_id").references("id").inTable("message");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("message_attachments");
}
