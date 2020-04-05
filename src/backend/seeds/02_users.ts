import Knex from 'knex';
import moment from 'moment';

export async function seed(knex: Knex) {
    const now = moment().toISOString();
    const user = {
        id: 'a542d177-17f7-4aac-8b17-2dcdbfcdcfe8',
        password: 'huehuehue',
        username: 'voinik',
        email_address: 'v@bnd.com',
        created_at: now,
        updated_at: now,
    };
    await knex('users').insert(user);
}
