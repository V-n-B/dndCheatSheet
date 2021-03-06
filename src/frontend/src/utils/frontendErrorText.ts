export const frontendErrorText: { [key: string]: string } = {
    GENERAL: 'Something went wrong! Please try again.',
    EMAIL_ALREADY_EXISTS: 'This email already exists. Please use another email address.',
    USERNAME_ALREADY_EXISTS: 'This username already exists. Please use another username.',
    CAPTCHA_FAILED: 'The Captcha failed. Are you a robot? >:(',
    VERIFICATION_TOKEN_DOES_NOT_EXIST: 'The verification token does not exist. Please register again.',
    VERIFICATION_TOKEN_HAS_EXPIRED: 'The verification token has expired. Please register again and click it within 2 hours.',
    ACCOUNT_ALREADY_VERIFIED: 'The account has already been verified.',
    WRONG_USERNAME_OR_PASSWORD: 'You\'ve entered an invalid username or password. Please try again.',
    ACCOUNT_IS_INACTIVE: 'This account is inactive. Please contact us at victor_panteleev@hotmail.com',

    // Voi validation
    string_min: 'The field contains too few characters',
    string_max: 'The field contains too many characters',
    string_empty: 'The field needs to be filled in',
};
