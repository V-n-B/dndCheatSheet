import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { App } from './components/App';
import { Dashboard } from './components/home/Dashboard';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';

const browserHistory = createBrowserHistory();

export function Entry() {
    return (
        <Router history={browserHistory}>
            <App>
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                </Switch>
            </App>
        </Router>
    );

}
