import { Container } from 'inversify';
import knex from 'knex';
import { KnexProvider } from './KnexProvider';

export function configureContainerBindings(container: Container, database: knex) {
    container.bind(KnexProvider).toConstantValue(new KnexProvider(database));
}
