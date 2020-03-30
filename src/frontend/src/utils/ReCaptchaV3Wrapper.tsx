import React, { useEffect, useState } from 'react';

interface IProps {
    action: string;
    formSubmitted: boolean;
    children: React.ReactNode;
    onCaptchaReady: (isReady: boolean) => void;
    onCaptchaToken: (captchaToken: string) => Promise<void>;
}

export function ReCaptchaV3Wrapper(props: IProps) {
    const [isReady, setIsReady] = useState(false);

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

    useEffect(() => {
        if (props.formSubmitted) {
            handleFormSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.formSubmitted, props.action, isReady]);

    return (
        <>
            {props.children}
        </>
    );

    function loadScript(): void {
        const url = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.nonce = '{NONCE}';
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
            setIsReady(true);
            props.onCaptchaReady(true);
        });
    }

    async function handleFormSubmit() {
        if (!isReady) {
            throw new Error('Captcha is not ready.');
        }

        const captchaToken = await window.grecaptcha.execute(siteKey, { action: props.action });
        await props.onCaptchaToken(captchaToken);
    }
}
