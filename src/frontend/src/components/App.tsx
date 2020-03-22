import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { Container } from 'reactstrap';
import { Navigation } from './navbar/Navigation';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
