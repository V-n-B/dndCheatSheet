import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { routes } from './routes';

const app = express();
const listenOn = process.env.LISTEN || 9000;

app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

routes(app._router);

app.listen(listenOn);
console.log('Listening on: ', listenOn);
