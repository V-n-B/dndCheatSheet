import { validateEntities } from '@wwwouter/typed-knex';
import { getKnexConnection } from '../backend/getKnexConnection';


async function run() {
    const database = getKnexConnection();
    console.log('Got knex connection');
    try {
        await validateEntities(database);
    } catch (e) {
        console.error(e);
        throw new Error(`Validating tables with database failed: ${e}`);
    }
    process.exit();
}

run();
