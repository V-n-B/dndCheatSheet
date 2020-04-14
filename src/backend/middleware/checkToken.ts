import express from 'express';
import { BackendErrorCodes } from '../utils/BackendErrorCodes';

export function checkToken(req: express.Request, res: express.Response, next: Function) {
    if (req.headers['dnd-token'] === undefined) {
        return res.status(403).send({ code: BackendErrorCodes.NO_DND_TOKEN });
    }
    if (req.session) {
        const user = (req.session).user;
        if (user && user.token && req.headers['dnd-token'] === user.token) {
            return next();
        }
    }
    return res.status(401).send({ code: BackendErrorCodes.DND_TOKEN_DOES_NOT_MATCH });
}
