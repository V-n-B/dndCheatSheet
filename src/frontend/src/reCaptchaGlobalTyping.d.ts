export { };

declare global {
    interface Window {
        grecaptcha: ReCaptchaInstance;
        captchaOnLoad: () => void;
    }
}

interface ReCaptchaRenderOptions {
    sitekey: string;
    size: 'invisible';
}

interface ReCaptchaInstance {
    ready: (cb: () => any) => void;
    execute: (sitekey: string, options: { action: string }) => Promise<string>;
    render: (id: string, options: ReCaptchaRenderOptions) => any;
}
