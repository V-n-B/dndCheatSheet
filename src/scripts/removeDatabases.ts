import { Client } from 'pg';
import knexfile from '../backend/knexfile';

async function run(onlyRemoveCurrentDb: boolean) {
    const client = new Client({
        user: knexfile.development.connection.user,
        password: knexfile.development.connection.password,
        database: 'postgres',
    });

    await client.connect();

    const active = 'EXISTS(SELECT * FROM pg_stat_activity WHERE pg_stat_activity.datname = pg_database.datname) as active';

    let dbNamePattern = 'dndcheatsheet%';
    if (onlyRemoveCurrentDb) {
        dbNamePattern = `${knexfile.development.connection.database}`;
    }
    const list = await client.query(`SELECT pg_database.datname, ${active} FROM pg_database WHERE pg_database.datname LIKE \'${dbNamePattern}\';`);

    for (const row of list.rows) {
        if (!row.active) {
            await client.query(`DROP DATABASE ${row.datname};`);
            console.log('dropped ' + row.datname);
        } else {
            console.log(row.datname + ' could not be dropped due to active connection(s)');
        }
    }

    client.end();
}

const args = process.argv;
const removeCurrentDbOnly = args[2] === 'current';
run(removeCurrentDbOnly);
