import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DndApp } from './dndApp/DndApp';
import { Dashboard } from './home/Dashboard';

export function DnDCheatsheetRoutes() {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard" exact>
                <Dashboard />
            </Route>
            <Route path="/app" exact>
                <DndApp />
            </Route>
            <Route>
                {/* This is necessary to redirect to the proper pages when logging in and out. We can figure out another way if we really need 404 pages */}
                <Redirect to="/dashboard" />
            </Route>
        </Switch>
    );
}
