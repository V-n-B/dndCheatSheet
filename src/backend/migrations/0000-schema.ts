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
        table.string('email_address').notNullable().unique();
        table.string('password');
        table.timestamp('last_login_on');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    // Drop the database
}
