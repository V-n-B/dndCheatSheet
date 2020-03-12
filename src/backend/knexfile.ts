import gitBranch from 'git-branch';
import path from 'path';
import pg from 'pg';

pg.types.setTypeParser(20, 'text', parseInt); // int8
pg.types.setTypeParser(1700, 'text', Number); // numeric
pg.types.setTypeParser(1082, 'text', String); // date

let databaseName = 'dndcheatsheet';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    let branchTag = gitBranch.sync().replace(/\W+/g, '_').toLowerCase();
    branchTag = branchTag.substring(0, 7).replace(/_$/, '');
    databaseName += '_' + branchTag;
}


export = {
    development: {
        client: 'postgresql',
        connection: {
            host: '127.0.0.1',
            port: '5432',
            database: databaseName,
            user: 'dnd',
            password: 'dev',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'seeds'),
        },
        asyncStackTraces: true,
    },
    production: {
        client: 'postgresql',
        connection: {
            host: process.env.POSTGRES_HOSTNAME,
            port: process.env.POSTGRES_PORT,
            database: process.env.POSTGRES_DB_NAME,
            password: process.env.POSTGRES_USERNAME,
            user: process.env.POSTGRES_PASSWORD,
            ssl: true,
        },
        pool: {
            min: 2,
            max: 30,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'seeds', 'production'),
        },
    },
};
