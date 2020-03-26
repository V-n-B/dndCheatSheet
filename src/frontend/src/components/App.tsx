import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Container } from 'reactstrap';
import { ContentWrapper } from './elements/common';
import { Navigation } from './navbar/Navigation';

library.add(faBars);

export function App(props: { children: React.ReactNode }) {
    return (
        <Container>
            <Navigation />
            <ContentWrapper>
                {props.children}
            </ContentWrapper>
        </Container>
    );
}

// Derpa
