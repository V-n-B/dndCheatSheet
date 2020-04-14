import express from 'express';
import { BackendErrorCodes } from '../utils/BackendErrorCodes';

export function checkUser(req: express.Request, res: express.Response, next: Function) {
    if (req.session && req.session.user) {
        return next();
    }

    return res.status(401).send({ code: BackendErrorCodes.NO_SESSION_USER });
}
