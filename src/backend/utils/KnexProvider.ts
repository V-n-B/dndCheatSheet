import Knex from 'knex';

export class KnexProvider {

    constructor(public readonly knex: Knex) { }
}
