import express from 'express';

export async function getEnv(req: express.Request, res: express.Response) {
    const settings = {
        environment: process.env.NODE_ENV,
        captchaSiteKey: process.env.CAPTCHA_SITE_KEY,
    };

    console.log('About to send back env settings');
    res.type('.js');
    res.send('window.dndAppSettings = ' + JSON.stringify(settings));
}
