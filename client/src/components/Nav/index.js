import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

export default function Nav({ fixed }) {
    const [menuOpen, setMenuOpen] = React.useState(false);
        if(Auth.loggedIn()) {
            return (
                <>
                <div className="flex flex-wrap w-full py-2">
                    <div className="w-full px-4">
                        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 rounded">
                            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                                <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                                    <a
                                        className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
                                        href="/"
                                    >
                                        Vacci-Date
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </a>
                                    <button
                                        className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                        type="button"
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        <i className="fas fa-bars"></i>
                                    </button>
                                </div>
                                <div
                                    className={
                                        "lg:flex flex-grow items-center" +
                                        (menuOpen ? " flex" : " hidden")
                                    }
                                    id="example-navbar-info"
                                >
                                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                        <li className="nav-item">
                                            <a
                                                className="px-3 py-2 flex items-center text-xl font-bold leading-snug text-white hover:opacity-75"
                                            >
                                                <Link to ="/matches">My Matches</Link>
                                            </a>  
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="px-3 py-2 flex items-center text-xl font-bold leading-snug text-white hover:opacity-75"
                                            >
                                                <Link to="/dashboard">Dashboard</Link>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="px-3 py-2 flex items-center text-xl font-bold leading-snug text-white hover:opacity-75"
                                                href="/" onClick={() => Auth.logout()}
                                            > 
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </>      
        );
        } else {
            return (
                <>
                <div className="flex flex-wrap w-full py-2">
                    <div className="w-full px-4">
                        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 rounded">
                            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                                <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                                    <a
                                        className="px-2 py-2 flex flex-col items-center text-xl font-bold leading-snug text-white hover:opacity-75"
                                        href="/"
                                    >
                                        Vacci-Date
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </a>
                                    <button
                                        className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                        type="button"
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        <i className="fas fa-bars"></i>
                                    </button>
                                </div>
                                <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-end">
                                    <ul className="flex flex-col">
                                        <li className="nav-item">
                                            <a
                                                className="px-3 py-2 flex items-center text-xl font-bold leading-snug text-white hover:opacity-75"
                                            >
                                                <Link to="/login">Login</Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
};