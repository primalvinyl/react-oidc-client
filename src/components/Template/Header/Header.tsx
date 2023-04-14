import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../AuthProvider';
import './Header.css';

const navArray = [
    { displayName: 'Home', path: '/' },
    { displayName: 'About', path: 'About' },
    { displayName: 'Private', path: 'Private' },
];

function Header() {
    const { isAuthenticated, signout, signin } = useAuthContext();
    
    return (
        <header>
            <h1>The Header</h1>
            <nav role="navigation" aria-label="Main Navigation">
                <ul>
                    {navArray.map(({ displayName, path }) => (
                        <li key={path}>
                            <NavLink to={path}>{displayName}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                {isAuthenticated() &&
                    <button onClick={() => signout()}>Logout</button> ||
                    <button onClick={() => signin()}>Login</button>
                }
            </div>
        </header>
    );
}

export default Header;
