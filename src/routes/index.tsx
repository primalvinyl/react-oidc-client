import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Template from '../components/Template/Template';
import SigninCallback from './Auth/SigninCallback';
import PrivateRoute from './Auth/PrivateRoute';
import Home from './Home';
import About from './About';
import Private from './Private';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Template />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signincallback" element={<SigninCallback />} />
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="private" element={<Private />} />
                </Route>
            </Route>
        </Routes>
    )
};

export default Router;
