import Knex from 'knex';
import { Client } from 'pg';
import knexfile from '../backend/knexfile';


async function run() {
    const client = new Client({
        user: knexfile.development.connection.user,
        password: knexfile.development.connection.password,
        database: 'postgres',
    });

    await client.connect();
    try {
        await client.query(`CREATE DATABASE ${knexfile.development.connection.database} OWNER dnd;`);
        console.log('created database ' + knexfile.development.connection.database);
        await client.end();

        const config = knexfile['development'];
        const database = Knex(config);

        await database.migrate.latest();
        console.log('Database has been migrated');

        await database.seed.run();
        console.log('Database has been seeded');

        process.exit();
    } catch (e) {
        // code '42P04' means database already exists
        if (e.code === '42P04') {
            console.error(`database already exists... ${e}`);
        } else {
            console.error(e);
        }
        process.exit();
    }
}

run();
