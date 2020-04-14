import React from 'react';
import { Button, Jumbotron } from 'reactstrap';

export function GeneralError() {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Whoops!</h1>
                <p className="lead">Something went wrong!</p>
                <hr className="my-2" />
                <p>We're aware something went wrong. Don't worry about it.</p>
                <p className="lead">
                    <Button onClick={() => window.location.reload()} color="primary">Just go back to safety!</Button>
                </p>
            </Jumbotron>
        </div>
    );
}
