import express from 'express';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { BackendErrorCodes } from '../../utils/BackendErrorCodes';
import { checkPassword, hashNewPassword } from '../../utils/hashing';
import { login as loginUser } from '../../utils/loginUser';
import { ensureProperCaptchaScore } from '../../utils/reCaptcha/ensureProperCaptchaScore';
import { ReCaptchaAction } from '../../utils/reCaptcha/ReCaptchaAction';
import { setUserInSession } from '../../utils/setUserInSession';
import { sendRegistrationMail } from './sendRegistrationMail';
import { sendWelcomeEmail } from './sendWelcomeEmail';
import { User } from './User';
import { UserRepository } from './UserRepository';

const REGISTRATION_TOKEN_EXPIRATION_MINUTES = 2 * 60;

export async function register(req: express.Request, res: express.Response) {
    const { email, password, username, captchaToken } = req.body;
    // TODO: Validate that shiiiiit


    const { errorCode } = await ensureProperCaptchaScore(captchaToken, ReCaptchaAction.register);
    if (errorCode) {
        return res.status(400).send({ code: errorCode });
    }

    const repository = new UserRepository();

    const emailExists = await repository.findOneByEmail(email);
    if (emailExists) {
        return res.status(200).send({ code: BackendErrorCodes.EMAIL_ALREADY_EXISTS });
    }

    const usernameExists = await repository.findOneByUsername(username);
    if (usernameExists) {
        return res.status(200).send({ code: BackendErrorCodes.USERNAME_ALREADY_EXISTS });
    }

    const id = uuidv4();
    const verification_token = uuidv4();
    const hashedPassword = await hashNewPassword(password);
    const newUser = {
        id,
        email: (email as string),
        password: hashedPassword,
        username: (username as string),
        is_active: false,
        verification_token,
        verification_token_generated_datetime: moment().toISOString(),
    };
    await repository.insertItem(newUser);
    await sendRegistrationMail(newUser.email, newUser.verification_token);

    res.status(201).send({});
}

export async function verifyAccount(req: express.Request, res: express.Response) {
    if (!req.session) {
        throw new Error('No session');
    }

    // TODO: Validate the shizz

    const token = req.body.verificationToken;
    const repository = new UserRepository();
    const user = await repository.findOneByVerificationToken(token);

    if (!user) {
        return res.status(400).send({ code: BackendErrorCodes.VERIFICATION_TOKEN_DOES_NOT_EXIST });
    }

    if (user.is_active) {
        return res.status(400).send({ code: BackendErrorCodes.ACCOUNT_ALREADY_VERIFIED });
    }

    const now = moment();
    const diffInMinutes = now.diff(user.verification_token_generated_datetime, 'minutes');

    if (diffInMinutes > REGISTRATION_TOKEN_EXPIRATION_MINUTES * 60) {
        return res.status(400).send({ code: BackendErrorCodes.VERIFICATION_TOKEN_HAS_EXPIRED });
    }

    const updatedUser: Partial<User> = {
        last_login_on: now.toISOString(),
        is_active: true,
    };

    await repository.updateItem(user.id, updatedUser);
    await sendWelcomeEmail(user.email, user.username);

    const loggedInUser = await loginUser(user.id);
    await setUserInSession(req, loggedInUser);
    res.status(200).send(req.session.user);
}

export async function login(req: express.Request, res: express.Response) {
    if (!req.session) {
        throw new Error('No session');
    }

    // TODO: Validate username password captchaToken
    const { username, password, captchaToken } = req.body;

    const { errorCode } = await ensureProperCaptchaScore(captchaToken, ReCaptchaAction.login);
    if (errorCode) {
        return res.status(400).send({ code: errorCode });
    }

    const repository = new UserRepository();
    const user = await repository.findOneByUsername(username);

    if (!user) {
        return res.status(401).send({ code: BackendErrorCodes.WRONG_USERNAME_OR_PASSWORD });
    }

    const passwordMatches = await checkPassword(password, user.password);
    if (!passwordMatches) {
        return res.status(401).send({ code: BackendErrorCodes.WRONG_USERNAME_OR_PASSWORD });
    }

    if (!user.is_active) {
        return res.status(400).send({ code: BackendErrorCodes.ACCOUNT_IS_INACTIVE });
    }

    const loggedInUser = await loginUser(user.id);
    await setUserInSession(req, loggedInUser);
    res.status(200).send(req.session.user);
}

export async function getCurrentSession(req: express.Request, res: express.Response) {
    if (!!req.session && !!req.session.user) {
        return res.status(200).send(req.session.user);
    }

    res.status(403).send({ code: BackendErrorCodes.NOT_LOGGED_IN });
}

export async function logout(req: express.Request, res: express.Response) {
    await new Promise((resolve, reject) => {
        if (!req.session) {
            return reject('No session to destroy');
        }

        req.session.destroy(() => {
            res.send({ loggedIn: false });
            resolve();
        });
    });
}
