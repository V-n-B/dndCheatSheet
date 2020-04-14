import 'bootstrap/dist/css/bootstrap.css';
import { polyfill } from 'es6-promise';
import 'font-awesome/css/font-awesome.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { AuthProvider } from './auth/AuthProvider';
import { App } from './components/App';
import './scss/dnd-cheat-sheet.scss';

polyfill();

const browserHistory = createBrowserHistory();

if (document.getElementById('app')) {
    render(
        <Router history={browserHistory}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>,
        document.getElementById('app')
    );
}
