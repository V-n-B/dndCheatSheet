import { FrontendErrorCodes } from './FrontendErrorCode';
import { frontendErrorText } from './frontendErrorText';

export function getErrorText(error: string) {
    if (frontendErrorText[error]) {
        return frontendErrorText[error];
    }
    return frontendErrorText[FrontendErrorCodes.GENERAL];
}
