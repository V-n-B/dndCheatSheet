import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('test_table', table => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.jsonb('data').notNullable();
        table.timestamps();
    });

    await knex.schema.createTable('users', table => {
        table.uuid('id').primary();
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password');
        table.boolean('is_active').defaultTo(false).notNullable();
        table.timestamp('verification_token_generated_datetime').notNullable();
        table.uuid('verification_token').notNullable();
        table.timestamp('last_login_on');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    // Drop the database
}
