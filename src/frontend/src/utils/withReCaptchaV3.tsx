import React, { useEffect, useState } from 'react';
import { Subtract } from 'utility-types';
import { ReCaptchaAction } from './ReCaptchaAction';

export interface IInjectedCaptchaProps {
    captchaIsReady: boolean;
    captchaToken: string;
    handleFormSubmit: () => Promise<void>;
}


export function withReCaptchaV3<P extends IInjectedCaptchaProps>(OriginalComponent: React.FC<P>, action: ReCaptchaAction) {
    type OriginalProps = Subtract<P, IInjectedCaptchaProps>;
    return function (props: OriginalProps) {
        const [captchaIsReady, setCaptchaIsReady] = useState(false);
        const [captchaToken, setCaptchaToken] = useState('');

        const propsToInject: IInjectedCaptchaProps = {
            captchaIsReady,
            captchaToken,
            handleFormSubmit,
        };

        const newProps = { ...propsToInject, ...props } as P;

        const siteKey = (window as any).dndAppSettings.captchaSiteKey;
        let captchaScript: HTMLScriptElement | undefined = undefined;
        let captchaWidget: HTMLDivElement | undefined = undefined;

        useEffect(() => {
            loadScript();
            return () => {
                if (captchaScript) {
                    document.body.removeChild(captchaScript);
                }
                if (captchaWidget) {
                    document.body.removeChild(captchaWidget);
                }
                const nodeBadge = document.querySelector('.grecaptcha-badge');
                if (nodeBadge && nodeBadge.parentNode) {
                    document.body.removeChild(nodeBadge.parentNode);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [captchaScript]);

        return (
            <OriginalComponent {...newProps} />
        );


        function loadScript(): void {
            const url = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.async = true;
            script.defer = true;
            script.id = 'captcha-script';
            script.addEventListener('load', onLoad);

            captchaScript = document.body.appendChild(script);
        }

        function onLoad() {
            const widget = document.createElement('div');
            widget.id = 'g-recaptcha';
            captchaWidget = document.body.appendChild(widget);

            window.grecaptcha.ready(() => {
                window.grecaptcha.render('g-recaptcha', {
                    sitekey: siteKey,
                    size: 'invisible',
                });
                setCaptchaIsReady(true);
            });
        }

        async function handleFormSubmit() {
            if (!captchaIsReady) {
                throw new Error('Captcha is not ready.');
            }
            setCaptchaToken(await window.grecaptcha.execute(siteKey, { action }));
        }
    };
}
