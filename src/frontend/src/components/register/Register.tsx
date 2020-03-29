import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { FormSpinner } from '../../utils/FormSpinner';
import { ReCaptchaV3 } from '../../utils/ReCaptchaV3';
import { CenterText, Clearfix, DangerAlert, SendFormButton, SuccessAlert } from '../elements/common';

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [sentSuccess, setSentSuccess] = useState<boolean | null>(null);
    const [captchaReady, setCaptchaReady] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);


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
                <ReCaptchaV3 action="register" onCaptchaReady={isReady => setCaptchaReady(isReady)} formSubmitted={formSubmitted} onCaptchaToken={handleCaptchaToken}>
                    {renderRegisterForm()}
                </ReCaptchaV3>
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
                    <Clearfix />
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
        const result = await fetch('api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, username, captchaToken }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.status === 200) {
            setIsProcessing(false);
            setEmail('');
            setPassword('');
            setUsername('');
            setSentSuccess(true);
        } else {
            setIsProcessing(false);
            setSentSuccess(false);
            setFormSubmitted(false);
        }
    }

    function renderFeedback() {
        if (isProcessing) {
            return <FormSpinner />;
        }
        if (sentSuccess === false) {
            return <DangerAlert headerText="Whoops!">
                Something went wrong! Please try again.
            </DangerAlert>;
        }
    }
}
