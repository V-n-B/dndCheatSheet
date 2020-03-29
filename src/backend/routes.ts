import express from 'express';
import path from 'path';
import * as env from './contexts/env/envController';
import * as register from './contexts/register/registerController';
import noCaching from './middleware/noCaching';
import { handlePromisedRoute } from './utils/handlePromisedRoute';

export function routes(router: express.Router) {
    router.get('/api/env.js', noCaching, handlePromisedRoute(env.getEnv));

    router.post('/api/register', noCaching, handlePromisedRoute(register.register));

    router.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
}
