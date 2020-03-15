import React from 'react';
import { Container } from 'reactstrap';

export function App(props: { children: React.ReactNode }) {
    return (
        <Container>
            {props.children}
        </Container>
    );
}

export default App;
