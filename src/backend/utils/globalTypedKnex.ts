import { TypedKnex } from '@wwwouter/typed-knex';
import Knex from 'knex';

let typedKnex = undefined as TypedKnex | undefined;

export function initGlobal(knex: Knex) {
    typedKnex = new TypedKnex(knex);
}

export function getGlobal(): TypedKnex {
    if (!typedKnex) {
        throw new Error('Typed knex not initialized');
    }
    return typedKnex;
}
