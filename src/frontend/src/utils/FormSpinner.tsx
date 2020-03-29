import React from 'react';
import { Spinner } from 'reactstrap';

export function FormSpinner() {
    return (
        <div className="form-spinner-container">
            <Spinner color="primary" className="form-spinner" />
        </div>
    );
}
