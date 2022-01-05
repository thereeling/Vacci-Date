import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { username: formState.username, password: formState.password },
            });
  
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
          <h2 className="mt-6 font-mono text-center text-3xl font-extrabold text-pink-500">Login to your account</h2>
        </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <label htmlFor="username" className="sr-only">
                Username:
              </label>
              <input
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="pwd" className="sr-only">
                Password:
              </label>
              <input
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            </div>
        {error ? (
          <div>
            <p className="text-sm text-pink-500 error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor="no-account" className="ml-2 block font-medium font-mono text-sm text-pink-900">
              Don't have an account?
            </label>
          </div>
          <div className="text-sm">
            <Link to="/signup" className="font-medium font-mono text-pink-900 hover:text-pink-400">
              Create one here!
            </Link>
          </div>
          </div>
          <button 
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-200 "
            >
              Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    );
}

export default Login;