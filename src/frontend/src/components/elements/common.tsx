import classnames from 'classnames';
import React from 'react';
import { Alert, Button } from 'reactstrap';

export function ContentWrapper(props: { children: React.ReactNode }) {
    return (
        <div className="content-wrapper">
            {props.children}
        </div>
    );
}

interface ISendFormButtonProps {
    isProcessing: boolean;
    color: string;
    captchaReady: boolean;
    children: React.ReactNode;
}

export function SendFormButton(props: ISendFormButtonProps) {
    const disabledClass = props.isProcessing || !props.captchaReady ? 'send-button-disabled' : '';
    return (
        <Button
            id="sendMessageButton"
            color={props.color}
            type="submit"
            disabled={!props.captchaReady || props.isProcessing}
            className={classnames('btn', 'btn-primary', 'btn-xl', 'text-uppercase', 'rounded-0', disabledClass)}
        >
            {props.children}
        </Button>
    );
}

export function CenterText(props: { children: React.ReactNode }) {
    return (
        <div className="col-lg-12 text-center">
            {props.children}
        </div>
    );
}

interface IAlert {
    headerText: string;
    children: React.ReactNode;
}

export function SuccessAlert(props: IAlert) {
    return (
        <div>
            <Alert color="success" className="success-alert">
                <h4 className="alert-heading center-text">{props.headerText}</h4>
                <p className="center-text">
                    {props.children}
                </p>
            </Alert>
        </div>
    );
}

export function DangerAlert(props: IAlert) {
    return (
        <div>
            <Alert color="danger">
                <h4 className="alert-heading center-text">{props.headerText}</h4>
                <p className="center-text">
                    {props.children}
                </p>
            </Alert>
        </div>
    );
}
