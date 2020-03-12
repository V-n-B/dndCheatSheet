import knex from 'knex';

export function getKnexConnection(): knex {
    // tslint:disable-next-line:no-require-imports
    const knexfile = require('./knexfile');
    const currentEnv = (process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV) as string;
    return knex(knexfile[currentEnv]);
}
