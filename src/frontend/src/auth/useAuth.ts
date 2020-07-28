import { useContext } from 'react';
import { fetchJson } from '../utils/fetchJson';
import { FrontendErrorCodes } from '../utils/FrontendErrorCode';
import { ActionType, AuthContext } from './auth';

export function useAuth() {
    const { authState, authDispatch } = useContext(AuthContext);

    function dispatchLogin(json: any) {
        authDispatch({
            type: ActionType.AUTH_LOGIN,
            user: {
                ...json,
                loggedIn: true,
            },
        });
    }

    async function dispatchLogout() {
        await fetchJson('/api/users/logout', 'DELETE');
        authDispatch({
            type: ActionType.AUTH_LOGOUT,
        });
    }

    function dispatchAuthFailed() {
        authDispatch({
            type: ActionType.AUTH_FAILED,
        });
    }

    async function fetchAuth() {
        const result = await fetchJson('/api/users/session', 'GET', undefined, [FrontendErrorCodes.NOT_LOGGED_IN]);
        if (result.json) {
            dispatchLogin(result.json);
        } else {
            dispatchAuthFailed();
        }
    }

    return {
        authState,
        dispatchLogin,
        dispatchLogout,
        fetchAuth,
    };
}
