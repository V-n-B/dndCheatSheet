import React, { useReducer } from 'react';
import { AuthContext, authReducer, initialAuth } from './auth';

export function AuthProvider(props: { children: React.ReactNode }) {
    const [authState, authDispatch] = useReducer(authReducer, initialAuth);

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
}
