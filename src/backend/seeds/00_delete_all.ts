import Knex from 'knex';
import { map } from 'lodash';

export async function seed(knex: Knex) {
    console.log('Deleting all data...');

    const results = await knex('pg_catalog.pg_tables')
        .select('tablename')
        .where('schemaname', 'public')
        .whereNotIn('tablename', ['knex_migrations', 'knex_migrations_lock']);
    const tables: string[] = map(results, 'tablename');

    while (tables.length) {
        const startLength = tables.length;
        for (let i = 0; i < startLength; i++) {
            try {
                await knex(tables[i]).del();
            } catch (e) {
                continue;
            }
            tables.splice(i, 1);
        }
        if (tables.length === startLength) {
            throw new Error('Failed to delete all data (maybe another cyclic dependency?)');
        }
    }
}
