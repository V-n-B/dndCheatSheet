import React, { Dispatch } from 'react';

interface IAuthContextProps {
    authState: IAuthenticationState;
    authDispatch: Dispatch<ActionTypes>;
}

export const AuthContext = React.createContext({} as IAuthContextProps);


interface ISessionuser {
    id?: string;
    username?: string;
    email?: string;
    loggedIn?: boolean;
    token?: string;
}

interface IAuthenticationState extends ISessionuser {
    loggedIn: boolean;
    checking: boolean;
}

export const initialAuth: IAuthenticationState = {
    loggedIn: false,
    checking: true,
    id: undefined,
    username: undefined,
    email: undefined,
    token: undefined,
};

export enum ActionType {
    AUTH_LOGIN = 'AUTH_LOGIN',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    AUTH_FAILED = 'AUTH_FAILED',
}


interface ILoginAction {
    type: ActionType.AUTH_LOGIN;
    user: ISessionuser;
}

interface ILogoutAction {
    type: ActionType.AUTH_LOGOUT;
}

interface IAuthFailedAction {
    type: ActionType.AUTH_FAILED;
}

type ActionTypes = ILoginAction | ILogoutAction | IAuthFailedAction;

export function authReducer(state: IAuthenticationState, action: ActionTypes): IAuthenticationState {
    switch (action.type) {
        case ActionType.AUTH_LOGIN:
            if (action.user.token) {
                sessionStorage.setItem('dnd-token', action.user.token);
            }
            return {
                loggedIn: true,
                checking: false,
                id: action.user.id,
                username: action.user.username,
                email: action.user.email,
                token: action.user.token,
            };

        case ActionType.AUTH_LOGOUT:
            if (sessionStorage.getItem('dnd-token')) {
                sessionStorage.removeItem('dnd-token');
            }
            return {
                ...initialAuth,
                checking: false,
            };

        case ActionType.AUTH_FAILED:
            if (sessionStorage.getItem('dnd-token')) {
                sessionStorage.removeItem('dnd-token');
            }
            return {
                ...initialAuth,
                checking: false,
            };

        default:
            return state;
    }
}
