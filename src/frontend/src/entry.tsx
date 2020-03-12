import { polyfill } from 'es6-promise';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import App from './components/App';
import { Dashboard } from './components/Dashboard';

polyfill();

const browserHistory = createBrowserHistory();

if (document.getElementById('app')) {
    render(
        <Router history={browserHistory}>
            <App>
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                </Switch>
            </App>
        </Router>,
        document.getElementById('app')
    );
}
