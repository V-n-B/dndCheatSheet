import React, { useEffect, useState } from 'react';
import { GeneralError } from '../errorPages/GeneralError';

export function CatchingComponent(props: { children: React.ReactNode }) {
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    if (hasErrors) {
        return <GeneralError />;
    }
    return <>{props.children}</>;


    function handleUnhandledRejection(promiseRejectionEvent: PromiseRejectionEvent) {
        promiseRejectionEvent.preventDefault();
        setHasErrors(true);
    }
}
