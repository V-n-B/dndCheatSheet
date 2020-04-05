import { validateEntities } from '@wwwouter/typed-knex';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { routes } from './routes';
import { BindingScope, injectable } from './utils/dependencyInjection';
import { KnexProvider } from './utils/KnexProvider';

@injectable(BindingScope.Singleton)
export class WebServer {

    constructor(
        private readonly knexProvider: KnexProvider
    ) { }

    public async start() {
        const app = express();
        const listenOn = process.env.LISTEN || 9000;

        await this.migrate();
        await this.validateTypedKnexTables();

        app.use(express.static(path.join(__dirname, '..', 'frontend')));
        app.use(helmet());
        app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(express.json());

        routes(app._router);

        await new Promise((resolve, reject) => {
            app.listen(listenOn, () => {
                resolve();
            });
        });

        console.log('Listening on: ', listenOn);
    }

    private async validateTypedKnexTables() {
        try {
            await validateEntities(this.knexProvider.knex);
        } catch (e) {
            console.error(e);
            throw new Error(`Validating tables with database failed: ${e}`);
        }
    }

    private async migrate() {
        try {
            this.knexProvider.knex.migrate.latest();
            const currentVersion = await this.knexProvider.knex.migrate.currentVersion();
            console.log(`Database migrations done, now at ${currentVersion}`);
        } catch (e) {
            console.error(`Database migration failed, server will not start: ${e}`);
            setTimeout(() => process.exit(1), 1000);
        }
    }
}
