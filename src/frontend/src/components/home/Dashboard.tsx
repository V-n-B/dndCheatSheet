import React from 'react';
import { Link } from 'react-router-dom';

export function Dashboard() {
    return (
        <>
            <h1 className="header">This is the dashboard!</h1>
            <Link to="/app">Go to app!</Link>
        </>
    );
}
