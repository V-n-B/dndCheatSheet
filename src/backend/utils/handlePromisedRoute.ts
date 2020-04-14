import express from 'express';
import { sessionDuration } from './sessionDuration';

export function handlePromisedRoute(requestHandler: (req: express.Request, res: express.Response) => Promise<any>): (req: express.Request, res: express.Response, next: any) => void {
    return (req: express.Request, res: express.Response, next: any) => {
        if (req.session === undefined || !req.session.user) {
            const now = new Date().getTime();
            res.cookie('session_expires', now + sessionDuration);
            res.cookie('server_time', now);
        }

        requestHandler(req, res).catch((error: Error) => {
            console.error('Backend error: ', error.name + (error.message ? ' ' + error.message : ''));
            res.status(500).send();
        });
    };
}
