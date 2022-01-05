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
    <div className="container max-w-3xl m-auto p-5">
      <h2 className="text-3xl text-center">Hello, {my.firstname}!</h2>
      <p className="text-center mb-5">Here, you can update your Vacci-Date Profile.</p>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="username">Your Username:</label>
          <input
            value={my.username}
            name="username"
            type="text"
            id="username"
            // onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="email">Account Email:</label>
          <input
            value={my.email}
            name="email"
            type="text"
            id="email"
            // onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="age">Age:</label>
          <input
            value={my.age}
            name="age"
            type="number"
            id="age"
            // onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-1" htmlFor="location">Location:</label>
          <select
            defaultValue={my.location}
            name="location"
            id="location"
            // onChange={handleChange}
          >
            {stateNames.map(state => <option value={state}>{state}</option>)}
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="gender">Gender:</label>
          <select 
            id="gender"
            name="gender"
            defaultValue={my.gender}
            // onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>
        <p className="font-bold mr-2 " htmlFor="preference">Preferences:</p>
        {/* At the moment, you cannot uncheck what is pre-checked! :-O */}
        <div>
          <div className="flex-row space-between my-2 flex flex-row ml-5">
            <div className="mr-3">
              {my.preference.includes("Male") ? 
                <input
                  type="checkbox"
                  id="Male"
                  name="Male"
                  checked
                  // onChange={handleChange}
                /> 
                : 
                <input
                  type="checkbox"
                  id="Male"
                  name="Male"
                // onChange={handleChange}
              />}
              <label for="Male" className="ml-1">Men</label>
            </div>
            <div className="mr-3">
              {my.preference.includes("Female") ? 
                <input
                  type="checkbox"
                  id="Female"
                  name="Female"
                  checked
                  // onChange={handleChange}
                /> 
                : 
                <input
                  type="checkbox"
                  id="Female"
                  name="Female"
                // onChange={handleChange}
              />}
              <label for="Female" className="ml-1">Women</label>
            </div>
            <div className="mr-3">
            {my.preference.includes("Non-binary") ? 
                <input
                  type="checkbox"
                  id="Non-binary"
                  name="Non-binary"
                  checked
                  // onChange={handleChange}
                /> 
                : 
                <input
                  type="checkbox"
                  id="Non-binary"
                  name="Non-binary"
                // onChange={handleChange}
              />}
              <label for="Non-binary" className="ml-1">Non-binary Folks</label>
            </div>
          </div>
          <div className="flex-row space-between my-2 flex flex-row ml-5">
            <div className="flex-row space-between mr-3">
              <label className="mr-1" htmlFor="agerangemin">Minimum Age:</label>
              <input
                defaultValue={my.agerangemin}
                name="agerangemin"
                type="number"
                id="about-me"
                className="font-bold w-11"
                // onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between">
              <label className="mr-1" htmlFor="agerangemin">Maximum Age:</label>
              <input
                defaultValue={my.agerangemax}
                name="agerangemin"
                type="number"
                id="about-me"
                className="font-bold w-11"
                // onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="my-2">
          <label className="font-bold mr-2" htmlFor="about-me">About Me:</label>
          <textarea
            value={my.aboutme}
            name="aboutme"
            type="textarea"
            id="about-me"
            className="block w-full my-2 mx-5"
            // onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="img">Avatar Selection:</label>
          <input
            placeholder="img"
            name="img"
            type="img"
            id="img"
            // onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;