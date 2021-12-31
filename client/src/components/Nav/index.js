import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
    function showNavigation() {
        if(Auth.loggedIn()) {
            return (
                <ul className="flex flex-row">
                    <li className="mx-1">
                        <Link to ="/matches">My Matches</Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex flex-row">
                    <li className="mx-1">
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex flex-row px-1">
            <h1 className="text-5xl">
                <Link to="/">
                    <span role="img" aria-label="hearts">
                    💘
                    </span>
                    Vacci-Date
                </Link>
            </h1>

            <nav>{showNavigation()}</nav>
        </header>
    );
}

export default Nav;