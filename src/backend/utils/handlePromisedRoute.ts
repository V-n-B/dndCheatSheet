import express from 'express';

export function handlePromisedRoute(requestHandler: (req: express.Request, res: express.Response) => Promise<any>): (req: express.Request, res: express.Response, next: any) => void {
    return (req: express.Request, res: express.Response, next: any) => {
        requestHandler(req, res).catch((error: Error) => {
            console.error('Backend error: ', error.name + (error.message ? ' ' + error.message : ''));
            res.status(500).send();
        });
    };
}
