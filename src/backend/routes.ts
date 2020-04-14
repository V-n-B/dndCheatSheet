import express from 'express';
import path from 'path';
import * as env from './contexts/env/envController';
import * as user from './contexts/user/userController';
import { checkToken } from './middleware/checkToken';
import { checkUser } from './middleware/checkUser';
import { noCaching } from './middleware/noCaching';
import { handlePromisedRoute } from './utils/handlePromisedRoute';

export function routes(router: express.Router) {
    router.get('/api/env.js', noCaching, handlePromisedRoute(env.getEnv));

    router.post('/api/users/register', noCaching, handlePromisedRoute(user.register));
    router.post('/api/users/verifyAccount', noCaching, handlePromisedRoute(user.verifyAccount));
    router.post('/api/users/login', noCaching, handlePromisedRoute(user.login));
    router.get('/api/users/session', noCaching, handlePromisedRoute(user.getCurrentSession));
    router.delete('/api/users/logout', noCaching, checkUser, checkToken, handlePromisedRoute(user.logout));

    router.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
}
