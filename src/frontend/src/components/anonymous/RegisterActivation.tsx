import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { fetchJson } from '../../utils/fetchJson';
import { FormSpinner } from '../../utils/FormSpinner';
import { FrontendErrorCodes } from '../../utils/FrontendErrorCode';
import { frontendErrorText } from '../../utils/frontendErrorText';
import { useQuery } from '../../utils/useQuery';
import { DangerAlert, SuccessAlert } from '../elements/common';

export function RegisterActivation() {
    const [isProcessing, setIsProcessing] = useState(true);
    const [feedbackText, setFeedbackText] = useState('');
    const [activationSuccess, setActivationSuccess] = useState<null | boolean>(null);
    const [isReadyForRedirect, setIsReadyForRedirect] = useState(false);
    const { dispatchLogin } = useAuth();
    const query = useQuery();

    useEffect(() => {
        verifyAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isReadyForRedirect && activationSuccess) {
        return <Redirect to="/dashoard" />;
    } else if (!isReadyForRedirect && activationSuccess) {
        return <SuccessAlert headerText="Account verified!">
            Your account has been verified. We're logging you in and sending you off to the dashboard!
        </SuccessAlert>;
    } else {
        return (
            <>
                <h1>Activation of your account</h1>
                {renderFeedback()}
            </>
        );
    }

    async function verifyAccount() {
        const token = query.get('token');

        if (!token) {
            throw new Error('No token in query');
        }

        const result = await fetchJson('/api/users/verifyAccount', 'POST', {
            verificationToken: token,
        }, [FrontendErrorCodes.VERIFICATION_TOKEN_DOES_NOT_EXIST, FrontendErrorCodes.VERIFICATION_TOKEN_HAS_EXPIRED, FrontendErrorCodes.ACCOUNT_ALREADY_VERIFIED]);
        console.log('result: ', result);

        setIsProcessing(false);

        if (result.status === 200) {
            dispatchLogin(result);
            setActivationSuccess(true);
            setTimeout(() => setIsReadyForRedirect(true), 2000);
        } else if (result.errorCode) {
            setActivationSuccess(false);
            setFeedbackText(result.errorCode);
        } else {
            throw new Error('Unexpected status and missing errorCode');
        }
    }

    function renderFeedback() {
        if (isProcessing) {
            return <FormSpinner />;
        }
        if (activationSuccess === false) {
            switch (feedbackText) {
                case FrontendErrorCodes.VERIFICATION_TOKEN_DOES_NOT_EXIST:
                    return <DangerAlert headerText="Whoops!">
                        {frontendErrorText[FrontendErrorCodes.VERIFICATION_TOKEN_DOES_NOT_EXIST]}
                    </DangerAlert>;

                case FrontendErrorCodes.VERIFICATION_TOKEN_HAS_EXPIRED:
                    return <DangerAlert headerText="Oh no!">
                        {frontendErrorText[FrontendErrorCodes.VERIFICATION_TOKEN_HAS_EXPIRED]}
                    </DangerAlert>;

                case FrontendErrorCodes.ACCOUNT_ALREADY_VERIFIED:
                    return <DangerAlert headerText="Oh no!">
                        {frontendErrorText[FrontendErrorCodes.ACCOUNT_ALREADY_VERIFIED]}
                    </DangerAlert>;

                default:
                    return <DangerAlert headerText="Whoopsy!">
                        Something went wrong! Please try again.
                    </DangerAlert>;
            }
        }
    }
}

