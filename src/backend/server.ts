import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { getKnexConnection } from './getKnexConnection';
import { routes } from './routes';
import { KnexProvider } from './utils/KnexProvider';

const app = express();
const listenOn = process.env.LISTEN || 9000;

const database = getKnexConnection();
const knexProvider = new KnexProvider(database);

migrate();
console.log('Starting database migrations');



app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

routes(app._router);

app.listen(listenOn);
console.log('Listening on: ', listenOn);

async function migrate() {
    try {
        knexProvider.knex.migrate.latest();
        const currentVersion = await knexProvider.knex.migrate.currentVersion();
        console.log(`Database migrations done, now at ${currentVersion}`);
    } catch (e) {
        console.error(`Database migration failed, server will not start: ${e}`);
        setTimeout(() => process.exit(1), 1000);
    }
}
