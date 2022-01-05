import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  // Autofilling form makes the content in each form area undefined? Will check later
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                input: 
                {email: formState.email,
                password: formState.password,
                firstname: formState.firstname,
                username: formState.username,
                age: parseInt(formState.age),
                location: formState.location,
                gender: formState.gender,
                preference: formState.preference,
                aboutme: formState.aboutme,
                img: formState.img}
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono">
          <div className="max-w-md w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-500">Signup</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}></form>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="firstname" className="">
                    First Name:
                  </label>
                  <input
                    placeholder="First Name"
                    name="firstname"
                    type="firstname"
                    id="firstname"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="">
                    Username:
                  </label>
                  <input
                    placeholder="Username"
                    name="username"
                    type="username"
                    id="username"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="">
                    Email:
                  </label>
                  <input
                    placeholder="your-email@test.com"
                    name="email"
                    type="email"
                    id="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="">
                    Password:
                  </label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="age" className="">
                   Age:
                  </label>
                  <input
                    placeholder="Age"
                    name="Age"
                    type="number"
                    id="age"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="location" className="">
                    Location:
                  </label>
                  <input
                    placeholder="Anywhere, USA"
                    name="Location"
                    type="location"
                    id="location"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="">
                    Gender:
                  </label>
                  <input
                    placeholder="M/F/Other"
                    name="gender"
                    type="gender"
                    id="gender"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="preference" className="">
                    Preference:
                  </label>
                  <input
                    placeholder="M/F/Other"
                    name="preference"
                    type="preference"
                    id="preference"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="about-me" className="">
                    About Me:
                  </label>
                  <input
                    placeholder="Interests/Hobbies/Quirks"
                    name="aboutme"
                    type="text"
                    id="about-me"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="img" className="">
                    Choose your Profile Picture:
                  </label>
                  <input
                    placeholder="Please choose and image"
                    name="img"
                    type="img"
                    id="img"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name="vax"
                    type="radio"
                    id="vax"
                    required
                    onChange={handleChange}/>
                  <label htmlFor="vax" className="ml-2 block text-sm text-pink-500">
                    By clicking this button I certify that I am vaccinated against COVID-19
                  </label>
              </div>
            </div>
            <div>
              <button 
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
  );
};

export default Signup;