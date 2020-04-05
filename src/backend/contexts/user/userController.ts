import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BackendErrorCodes } from '../../utils/BackendErrorCodes';
import { getCaptchaVerificationResponse } from '../../utils/getCaptchaVerificationResponse';
import { hashNewPassword } from '../../utils/hashing';
import { UserRepository } from './UserRepository';

const registerAction = 'register';
const captchaScoreThreshold = 0.7;

export async function register(req: express.Request, res: express.Response) {
    const { email, password, username, captchaToken } = req.body;
    // Validate that shiiiiit

    const verification = await getCaptchaVerificationResponse(captchaToken);
    console.log('The score we got is: ', verification.score);
    if (verification.errorCodes && verification.errorCodes.length > 0) {
        console.error(`Received errorcodes from the Captcha request: ${JSON.stringify(verification.errorCodes, null, 4)}`);
    }
    if (!verification.success) {
        console.error('The token used did not come from our Google account');
        return res.status(400).send({ code: BackendErrorCodes.CAPTCHA_FAILED });
    }
    if (verification.action !== registerAction) {
        console.error(`The action we got (${verification.action}) does not match the expected action (${registerAction})`);
        return res.status(400).send({ code: BackendErrorCodes.CAPTCHA_FAILED });
    }
    if (verification.score < captchaScoreThreshold) {
        console.error(`The captcha score we got (${verification.score}) is lower than the threshold (${captchaScoreThreshold})`);
        return res.status(400).send({ code: BackendErrorCodes.CAPTCHA_FAILED });
    }

    const repository = new UserRepository();

    const userExists = await repository.findOneByEmail(email);
    console.log('userExists: ', userExists);
    if (userExists) {
        return res.status(200).send({ code: BackendErrorCodes.EMAIL_ALREADY_EXISTS });
    }

    const id = uuidv4();
    const hashedPassword = await hashNewPassword(password);
    const newUser = {
        id,
        email_address: (email as string),
        password: hashedPassword,
        username: (username as string),
    };
    await repository.insertItem(newUser);

    res.status(201).send({});
}
