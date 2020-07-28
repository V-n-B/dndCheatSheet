import React, { useEffect, useState } from 'react';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useAuth } from '../../auth/useAuth';
import { fetchJson } from '../../utils/fetchJson';
import { FormSpinner } from '../../utils/FormSpinner';
import { FrontendErrorCodes } from '../../utils/FrontendErrorCode';
import { frontendErrorText } from '../../utils/frontendErrorText';
import { getErrorText } from '../../utils/getErrorText';
import { ReCaptchaAction } from '../../utils/ReCaptchaAction';
import { useFormField } from '../../utils/useFormField';
import { emptyValidationErrors, validate, ValidationErrors } from '../../utils/validation';
import { IInjectedCaptchaProps, withReCaptchaV3 } from '../../utils/withReCaptchaV3';
import { loginSchema } from '../../validation/user';
import { CenterText, DangerAlert, SendFormButton } from '../elements/common';

function InnerLogin(props: IInjectedCaptchaProps) {
    const [useOnChangeValidation, setUseOnChangeValidation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [formErrors, setFormErrors] = useState<ValidationErrors>(emptyValidationErrors);
    const [username, setUsername] = useFormField('username', '', loginSchema, useOnChangeValidation, formErrors, setFormErrors);
    const [password, setPassword] = useFormField('password', '', loginSchema, useOnChangeValidation, formErrors, setFormErrors);
    const { dispatchLogin } = useAuth();

    useEffect(() => {
        if (props.captchaToken) {
            handleCaptchaToken();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.captchaToken]);

    return (
        <>
            {renderFeedback()}
            <h1>Login</h1>
            <Form
                id="contactForm"
                onSubmit={async e => {
                    e.preventDefault();
                    await handleSubmit();
                }}
                autoComplete="off">
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={e => {
                            setUsername(e.currentTarget.value);
                        }}
                        invalid={!!formErrors.get('username')}
                    />
                    <FormFeedback>{getFeedbackText(formErrors.get('username'))}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => {
                            setPassword(e.currentTarget.value);
                        }}
                        invalid={!!formErrors.get('password')}
                    />
                    <FormFeedback>{getFeedbackText(formErrors.get('password'))}</FormFeedback>
                </FormGroup>
                <CenterText>
                    <SendFormButton isProcessing={isProcessing} captchaReady={props.captchaIsReady} color="primary">
                        Login
                    </SendFormButton>
                </CenterText>
            </Form>
        </>
    );

    async function handleSubmit() {
        const { hasErrors, errors } = validateForm();
        if (hasErrors) {
            setFormErrors(errors);
            setUseOnChangeValidation(true);
            return;
        }

        setIsProcessing(true);
        await props.handleFormSubmit();
    }

    async function handleCaptchaToken() {
        const result = await fetchJson('/api/users/login', 'POST',
            { username, password, captchaToken: props.captchaToken },
            [FrontendErrorCodes.CAPTCHA_FAILED, FrontendErrorCodes.WRONG_USERNAME_OR_PASSWORD, FrontendErrorCodes.ACCOUNT_IS_INACTIVE]
        );

        setIsProcessing(false);

        if (result.status === 200) {
            dispatchLogin(result);
        } else {
            setLoginFailed(true);
            if (result.errorCode) {
                setFeedbackText(result.errorCode);
                setPassword('');
            } else {
                throw new Error('Unexpected status and missing errorCode');
            }
        }
    }

    function renderFeedback() {
        if (isProcessing) {
            return <FormSpinner />;
        }
        if (loginFailed) {
            switch (feedbackText) {
                case FrontendErrorCodes.WRONG_USERNAME_OR_PASSWORD:
                    return <DangerAlert headerText="Whoops!">
                        {frontendErrorText[FrontendErrorCodes.WRONG_USERNAME_OR_PASSWORD]}
                    </DangerAlert>;

                case FrontendErrorCodes.ACCOUNT_IS_INACTIVE:
                    return <DangerAlert headerText="Whoops!">
                        {frontendErrorText[FrontendErrorCodes.ACCOUNT_IS_INACTIVE]}
                    </DangerAlert>;

                case FrontendErrorCodes.CAPTCHA_FAILED:
                    return <DangerAlert headerText="What the..?!">
                        {frontendErrorText[FrontendErrorCodes.CAPTCHA_FAILED]}
                    </DangerAlert>;

                default:
                    return <DangerAlert headerText="Whoopsy!">
                        {frontendErrorText[FrontendErrorCodes.GENERAL]}
                    </DangerAlert>;
            }
        }
    }

    function getFeedbackText(errorMessage?: string) {
        return errorMessage ? getErrorText(errorMessage) : '';
    }

    function validateForm() {
        const loginForm = { username, password };
        return validate(loginSchema, loginForm);
    }
}

export const Login = withReCaptchaV3(InnerLogin, ReCaptchaAction.login);
