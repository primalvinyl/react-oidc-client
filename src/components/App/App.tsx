import React from 'react';
import Router from '../../routes'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthProvider/AuthProvider';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
