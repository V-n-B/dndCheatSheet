import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './anonymous/Login';
import { Register } from './anonymous/Register';
import { RegisterActivation } from './anonymous/RegisterActivation';

export function AnonymousRoutes() {
    return (
        <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Route path="/callback/email" exact>
                <RegisterActivation />
            </Route>
            <Route>
                {/* This is necessary to redirect to the proper pages when logging in and out. We can figure out another way if we really need 404 pages */}
                <Redirect to="/login" />;
            </Route>
        </Switch>
    );
}
