import { BackendErrorCodes } from '../BackendErrorCodes';
import { getCaptchaVerificationResponse } from './getCaptchaVerificationResponse';
import { ReCaptchaAction } from './ReCaptchaAction';

const CAPTCHA_SCORE_THRESHOLD = 0.7;

interface ICaptchaResult {
    errorCode: BackendErrorCodes | undefined;
}

export async function ensureProperCaptchaScore(captchaToken: string, action: ReCaptchaAction): Promise<ICaptchaResult> {
    const verification = await getCaptchaVerificationResponse(captchaToken);
    console.log('The score we got is: ', verification.score);

    let errorCode;
    if (verification.errorCodes && verification.errorCodes.length > 0) {
        console.error(`Received errorcodes from the Captcha request: ${JSON.stringify(verification.errorCodes, null, 4)}`);
    }
    if (!verification.success) {
        console.error('The token used did not come from our Google account');
        errorCode = BackendErrorCodes.CAPTCHA_FAILED;
    }
    if (verification.action !== action) {
        console.error(`The action we got (${verification.action}) does not match the expected action (${action})`);
        errorCode = BackendErrorCodes.CAPTCHA_FAILED;
    }
    if (verification.score < CAPTCHA_SCORE_THRESHOLD) {
        console.error(`The captcha score we got (${verification.score}) is lower than the threshold (${CAPTCHA_SCORE_THRESHOLD})`);
        errorCode = BackendErrorCodes.CAPTCHA_FAILED;
    }

    return { errorCode };
}
