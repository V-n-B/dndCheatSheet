import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useAuth } from '../auth/useAuth';
import { AnonymousRoutes } from './AnonymousRoutes';
import { DnDCheatsheetRoutes } from './DnDCheatsheetRoutes';
import { CatchingComponent } from './elements/CatchingComponent';
import { ContentWrapper } from './elements/common';
import { Navigation } from './navbar/Navigation';

library.add(faBars, faDiceD20);

export function App() {
    const { authState, fetchAuth } = useAuth();

    useEffect(() => {
        fetchAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (authState.checking) {
        return null;
    }

    return (
        <Container>
            <CatchingComponent>
                <Navigation />
                <ContentWrapper>
                    {authState.loggedIn ?
                        <DnDCheatsheetRoutes /> :
                        <AnonymousRoutes />
                    }
                </ContentWrapper>
            </CatchingComponent>
        </Container>
    );
}
