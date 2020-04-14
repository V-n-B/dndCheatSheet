import Knex from 'knex';
import moment from 'moment';

export async function seed(knex: Knex) {
    const now = moment().toISOString();
    const user = {
        id: 'a542d177-17f7-4aac-8b17-2dcdbfcdcfe8',
        password: 'huehuehue',
        username: 'testaccount',
        email: 'v@bnd.com',
        is_active: false,
        verification_token: '5c527f0d-1e35-4aed-b92b-c0a977650411',
        verification_token_generated_datetime: now,
        created_at: now,
        updated_at: now,
    };
    await knex('users').insert(user);
}
