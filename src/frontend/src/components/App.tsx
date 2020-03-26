import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Navigation } from './navbar/Navigation';

library.add(faBars);

export function App(props: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            <div className="content-wrapper">
                {props.children}
            </div>
        </>
    );
}
