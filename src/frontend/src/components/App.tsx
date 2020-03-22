import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Container, Row } from 'reactstrap';
import { Navigation } from './navbar/Navigation';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ContentWrapper } from './elements/common';

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
