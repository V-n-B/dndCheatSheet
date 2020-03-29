import express from 'express';

export default function noCaching(req: express.Request, res: express.Response, next: Function) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}
