import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("chat_user", (table) => {
    table.integer("chat_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("chat_id").references("chat.id");
    table.foreign("user_id").references("user.id");
    table.primary(["chat_id", "user_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("chat_user");
}
