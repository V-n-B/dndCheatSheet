import { validateEntities } from '@wwwouter/typed-knex';
import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import connectSessionKnex from 'connect-session-knex';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import { routes } from './routes';
import { BindingScope, injectable } from './utils/dependencyInjection';
import { KnexProvider } from './utils/KnexProvider';
import { sessionDuration } from './utils/sessionDuration';

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

        AWS.config.update({ region: process.env.AWS_SES_REGION });
        AWS.config.accessKeyId = process.env.ACCESSKEYID;
        AWS.config.secretAccessKey = process.env.SECRETACCESSKEY;

        app.use(express.static(path.join(__dirname, '..', 'frontend')));
        app.use(helmet());
        app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(express.json());

        if (app.get('env') === 'production') {
            app.set('trust proxy', 1); // trust first proxy
        } else {
            process.env.COOKIE_SECRET = 'jaVwjRutxr+9jKCU';
        }

        app.use(session({
            cookie: {
                sameSite: 'lax',
                secure: !['development'].includes(process.env.NODE_ENV || ''),
                maxAge: sessionDuration,
            },
            proxy: true,
            resave: false,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET || '',
            store: new (connectSessionKnex(session))({ knex: this.knexProvider.knex }),
            rolling: true,
        }));

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
