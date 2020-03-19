import 'bootstrap/dist/css/bootstrap.css';
import { polyfill } from 'es6-promise';
import 'font-awesome/css/font-awesome.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { App } from './components/App';
// import { Dashboard } from './components/home/Dashboard';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import './scss/dnd-cheat-sheet.scss';

polyfill();

const browserHistory = createBrowserHistory();

if (document.getElementById('app')) {
    render(
        <Router history={browserHistory}>
            <App>
                <Switch>
                    <Route path="/" exact>
                        {/* <Dashboard /> */}
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                </Switch>
            </App>
        </Router>,
        document.getElementById('app')
    );
}
