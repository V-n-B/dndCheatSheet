import React from 'react';
import { Container } from 'reactstrap';

function App(props: { children: React.ReactNode }) {
    return (
        <Container>
            {props.children}
        </Container>
    );
}

export default App;
