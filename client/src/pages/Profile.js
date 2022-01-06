import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import stateNames from '../utils/stateNames';

const Profile=(props) => {
  const { loading, data, error }=useQuery(QUERY_USER);

  const my=data?.me || {};
  console.log(my);

  const [formState, setFormState]=useState({ email: '', password: ''});
  const handleFormSubmit=async (event) => {
    event.preventDefault();
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6 font-mono">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-pink-500">Profile</h3>
              <p className="mt-1 text-sm text-pink-800">
                Hello, {my.firstname}!<br></br>
                Here, you can update your Vacci-Date Profile.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="font-mono" onSubmit={handleFormSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                      My Username:
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="username"
                        name="username"
                        rows={1}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        value={my.username}
                        // onChange={handleChange}
                      />
                    </div>
                    <label htmlFor="about-me" className="block text-sm font-medium text-gray-700">
                      About Me:
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={my.aboutme}
                        id="about-me"
                        name="aboutme"
                        rows={3}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        // onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. 
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="img">
                      Avatar Selection:
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-pink-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium font-mono leading-6 text-gray-900">Personal Information</h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="font-mono" onSubmit={handleFormSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address:
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={my.email}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                        Location:
                      </label>
                        <select
                          defaultValue={my.location}
                          name="location"
                          id="location"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                          // onChange={handleChange}
                        >
                          {stateNames.map(state => <option value={state}>{state}</option>)}
                        </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age:
                      </label>
                      <input
                        value={my.age}
                        type="text"
                        name="age"
                        id="age"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        My Gender:
                      </label>
                      <select 
                        id="gender"
                        name="gender"
                        defaultValue={my.gender}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        // onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                      </select> 
                    </div>
                    {/* At the moment, you cannot uncheck what is pre-checked! :-O */}
                    <div className="col-span-6">
                      <label htmlFor="preference" className="block text-sm font-medium text-gray-700">
                        Match Preferences:
                      </label>
                      {my.preference.includes("Male") ? 
                        <input
                          type="checkbox"
                          id="Male"
                          name="Male"
                          checked
                          className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          // onChange={handleChange}
                        /> 
                        : 
                        <input
                          type="checkbox"
                          id="Male"
                          name="Male"
                          className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        // onChange={handleChange}
                      />}
                      <label for="Male" className="block text-sm font-medium text-gray-700">Men</label>
                        {my.preference.includes("Female") ? 
                          <input
                            type="checkbox"
                            id="Female"
                            name="Female"
                            checked
                            className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            // onChange={handleChange}
                          /> 
                          : 
                          <input
                            type="checkbox"
                            id="Female"
                            name="Female"
                            className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            // onChange={handleChange}
                        />}
                      <label for="Female" className="block text-sm font-medium text-gray-700">Women</label>
                        {my.preference.includes("Non-binary") ? 
                          <input
                            type="checkbox"
                            id="Non-binary"
                            name="Non-binary"
                            checked
                            className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            // onChange={handleChange}
                          /> 
                          : 
                          <input
                            type="checkbox"
                            id="Non-binary"
                            name="Non-binary"
                            className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            // onChange={handleChange}
                        />}
                      <label for="Non-binary" className="block text-sm font-medium text-gray-700">Non-binary Folks</label>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="agerangemin" className="block text-sm font-medium text-gray-700">
                        Minimum Age:
                      </label>
                      <input 
                        defaultValue={my.agerangemin}
                        id="about-me"
                        name="agerangemin"
                        type="number"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        // onChange={handleChange}
                      /> 
                    </div> 
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="agerangemin" className="block text-sm font-medium text-gray-700">
                        Maximum Age:
                      </label>
                      <input 
                        defaultValue={my.agerangemax}
                        id="about-me"
                        name="agerangemin"
                        type="number"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        // onChange={handleChange}
                      /> 
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
   
//Not sure if we need this for avatar section
//<input
//placeholder="img"
//name="img"
//type="img"
//id="img"
// onChange={handleChange}


export default Profile;