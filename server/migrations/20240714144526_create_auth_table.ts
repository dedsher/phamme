import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('auth', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.string('refresh_token').defaultTo(null);
        table.boolean('is_verified').notNullable().defaultTo(false);
        table.foreign("user_id").references("user.id").onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('auth');
}

