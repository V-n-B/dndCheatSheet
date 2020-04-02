import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { fetchJson } from '../../utils/fetchJson';
import { FormSpinner } from '../../utils/FormSpinner';
import { FrontendErrorCodes } from '../../utils/FrontendErrorCode';
import { frontendErrorText } from '../../utils/frontendErrorText';
import { ReCaptchaAction } from '../../utils/ReCaptchaAction';
import { IInjectedCaptchaProps, withReCaptchaV3 } from '../../utils/withReCaptchaV3';
import { CenterText, DangerAlert, SendFormButton, SuccessAlert } from '../elements/common';

function InnerRegister(props: IInjectedCaptchaProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [sentSuccess, setSentSuccess] = useState<boolean | null>(null);
    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
        if (props.captchaToken) {
            handleCaptchaToken();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.captchaToken]);

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
                <h1>Register</h1>
                <Form
                    id="contactForm"
                    onSubmit={async e => {
                        e.preventDefault();
                        await handleSubmit();
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
                            onChange={e => {
                                setEmail(e.currentTarget.value);
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
                            onChange={e => {
                                setPassword(e.currentTarget.value);
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
                            onChange={e => {
                                setUsername(e.currentTarget.value);
                            }}
                        />
                    </FormGroup>
                    <CenterText>
                        <SendFormButton isProcessing={isProcessing} captchaReady={props.captchaIsReady} color="primary">
                            Send message
                        </SendFormButton>
                    </CenterText>
                </Form>
            </>
        );
    }

    async function handleSubmit() {
        // TODO: validation call goes here
        setIsProcessing(true);
        await props.handleFormSubmit();
    }

    async function handleCaptchaToken() {
        const result = await fetchJson('api/register', 'POST', { email, password, username, captchaToken: props.captchaToken }, [FrontendErrorCodes.CAPTCHA_FAILED]);

        setIsProcessing(false);

        if (result.status === 201) {
            handleRegisterSuccess();
        } else {
            setSentSuccess(false);
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

export const Register = withReCaptchaV3(InnerRegister, ReCaptchaAction.register);
