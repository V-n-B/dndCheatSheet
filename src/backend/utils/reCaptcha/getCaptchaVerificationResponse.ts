import fetch from 'node-fetch';

export async function getCaptchaVerificationResponse(token: string) {
    const secretKey = process.env.CAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const result = await fetch(url, {
        method: 'POST',
    });
    const resultJson = await result.json();

    return {
        success: resultJson.success,
        score: resultJson.score,
        action: resultJson.action,
        errorCodes: resultJson['error-codes'],
    };
}
