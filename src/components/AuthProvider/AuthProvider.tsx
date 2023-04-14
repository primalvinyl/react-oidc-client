import React from 'react';
import AuthService from './AuthService';

const AuthContext = React.createContext({
    isAuthenticated: () => ({}),
    signin: () => {},
    signinCallback: () => {},
    signout: () => {},
});

type AuthProviderTypes = {
    children: JSX.Element
};

export const AuthProvider = ({ children }: AuthProviderTypes) => {
    const authService = new AuthService();

    return (
        <AuthContext.Provider value={authService}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => React.useContext(AuthContext);
