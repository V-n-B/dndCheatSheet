import express from 'express';
import { SessionUser } from './SessionUser';

export interface ILoginUser {
    id: string;
    username: string;
    email: string;
    is_active: boolean;
}

// We need this because of: https://github.com/expressjs/session/issues/360
export async function setUserInSession(req: express.Request, user: ILoginUser) {
    if (!req.session) {
        throw new Error('Session is undefined');
    }

    await new Promise((resolve) => {
        req.session!.regenerate(() => {
            resolve();
        });
    });

    req.session.user = new SessionUser(user);

    await new Promise((resolve) => {
        req.session!.save(() => {
            resolve();
        });
    });
}
