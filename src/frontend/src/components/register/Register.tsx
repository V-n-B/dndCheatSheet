import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { fetchJson } from '../../utils/fetchJson';
import { FormSpinner } from '../../utils/FormSpinner';
import { FrontendErrorCodes } from '../../utils/FrontendErrorCode';
import { frontendErrorText } from '../../utils/frontendErrorText';
import { ReCaptchaV3Wrapper } from '../../utils/ReCaptchaV3Wrapper';
import { CenterText, DangerAlert, SendFormButton, SuccessAlert } from '../elements/common';

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [sentSuccess, setSentSuccess] = useState<boolean | null>(null);
    const [captchaReady, setCaptchaReady] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');


    if (sentSuccess) {
        return <SuccessAlert headerText="Thank you!">
            Message received! Thanks for reaching out to us, we'll be in touch!
        </SuccessAlert>;
    } else {
        return renderForm();
    }

    function renderForm() {
        return (
            <>
                {renderFeedback()}
                <ReCaptchaV3Wrapper action="register" onCaptchaReady={isReady => setCaptchaReady(isReady)} formSubmitted={formSubmitted} onCaptchaToken={handleCaptchaToken}>
                    {renderRegisterForm()}
                </ReCaptchaV3Wrapper>
            </>
        );
    }

    function renderRegisterForm() {
        return (
            <>
                <h1>Register</h1>
                <Form
                    id="contactForm"
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    autoComplete="off">
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            className="form-control"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={async event => {
                                setEmail(event.currentTarget.value);
                            }}
                        />
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
                            onChange={async event => {
                                setPassword(event.currentTarget.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            className="form-control"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={async event => {
                                setUsername(event.currentTarget.value);
                            }}
                        />
                    </FormGroup>
                    <CenterText>
                        <SendFormButton isProcessing={isProcessing} captchaReady={captchaReady} color="primary">
                            Send message
                        </SendFormButton>
                    </CenterText>
                </Form>
            </>
        );
    }

    function handleSubmit() {
        // TODO: validation call goes here
        setIsProcessing(true);
        setFormSubmitted(true);
    }

    async function handleCaptchaToken(captchaToken: string) {
        const result = await fetchJson('api/register', 'POST', { email, password, username, captchaToken }, [FrontendErrorCodes.CAPTCHA_FAILED]);

        setIsProcessing(false);

        if (result.status === 201) {
            handleRegisterSuccess();
        } else {
            setSentSuccess(false);
            setFormSubmitted(false);
            if (result.status === 200 && result.json && result.json.code) {
                setFeedbackText(result.json.code);
            } else if (result.errorCode) {
                setFeedbackText(result.errorCode);
            } else {
                throw new Error('Unexpected status and missing errorCode');
            }
        }
    }

    function handleRegisterSuccess() {
        setEmail('');
        setPassword('');
        setUsername('');
        setSentSuccess(true);
        setFeedbackText('');
    }

    function renderFeedback() {
        if (isProcessing) {
            return <FormSpinner />;
        }
        if (sentSuccess === false) {
            switch (feedbackText) {
                case FrontendErrorCodes.EMAIL_ALREADY_EXISTS:
                    return <DangerAlert headerText="Whoops!">
                        {frontendErrorText[FrontendErrorCodes.EMAIL_ALREADY_EXISTS]}
                    </DangerAlert>;

                case FrontendErrorCodes.CAPTCHA_FAILED:
                    return <DangerAlert headerText="What the..?!">
                        {frontendErrorText[FrontendErrorCodes.CAPTCHA_FAILED]}
                    </DangerAlert>;

                default:
                    return <DangerAlert headerText="Whoopsy!">
                        Something went wrong! Please try again.
                    </DangerAlert>;
            }
        }
    }
}
