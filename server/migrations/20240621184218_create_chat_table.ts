import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("chat", (table) => {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.text("last_message").notNullable();
    table.timestamp("last_message_at").notNullable();
    table.integer("last_message_author_id").notNullable();
    table.integer("unread_count").defaultTo(0);
    table.foreign("last_message_author_id").references("user.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("chat");
}
