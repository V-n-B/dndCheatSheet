import Knex from 'knex';

export async function seed(knex: Knex) {
    const data = {
        foo: 'bar',
        derp: 'buzz',
    };
    const test = {
        id: 'd50df0aa-79f3-4f16-8598-2c94001e2050',
        name: 'Victor',
        data,
        created_at: new Date(),
        updated_at: new Date(),
    };
    await knex('test_table').insert(test);
}
