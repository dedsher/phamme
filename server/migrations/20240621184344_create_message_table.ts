import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("message", (table) => {
    table.increments("id").primary();
    table.integer("chat_id").notNullable();
    table.integer("sender_id").notNullable();
    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.enum("status", ["delivered", "read"]).defaultTo("delivered");
    table.integer("reply_to").defaultTo(null);
    table.foreign("chat_id").references("chat.id");
    table.foreign("sender_id").references("user.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("message");
}