import 'bootstrap/dist/css/bootstrap.css';
import { polyfill } from 'es6-promise';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { render } from 'react-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Entry } from './entry';
import './scss/dnd-cheat-sheet.scss';

polyfill();

if (document.getElementById('app')) {
    render(
        <Entry />,
        document.getElementById('app')
    );
}
