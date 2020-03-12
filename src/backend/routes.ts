import express from 'express';
import path from 'path';

export function routes(router: express.Router) {
    router.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
}
