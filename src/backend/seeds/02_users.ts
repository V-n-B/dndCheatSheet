import Knex from 'knex';

export async function seed(knex: Knex) {
    const user = {
        id: 'a542d177-17f7-4aac-8b17-2dcdbfcdcfe8',
        first_name: 'John',
        last_name: 'Doe',
        password: 'huehuehue',
        salt: 'saltysalt',
        user_name: 'voinik',
        email_address: 'v@bnd.com',
        created_at: new Date(),
        updated_at: new Date(),
    };
    await knex('users').insert(user);
}
