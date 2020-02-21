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
        table.string('first_name');
        table.string('last_name').notNullable();
        table.string('email_address').notNullable();
        table.string('password');
        table.string('salt');
        table.timestamp('last_login_on');
        table.string('user_name').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    // Drop the database
}
