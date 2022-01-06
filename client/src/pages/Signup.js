import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import stateNames from '../utils/stateNames';
import genderOptions from '../utils/genderOptions';

function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formState.agerangemax < formState.agerangemin) {
      return alert('Your minimum age is higher than your minimum age!')
    }
    const mutationResponse = await addUser({
      variables: {
        input:
        {
          email: formState.email,
          username: formState.username,
          password: formState.password,
          firstname: formState.firstname,
          gender: formState.gender,
          age: parseInt(formState.age),
          location: formState.location,
          preference: formState.preference,
          agerangemin: parseInt(formState.agerangemin),
          agerangemax: parseInt(formState.agerangemax),
          aboutme: formState.aboutme
        }
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

  const [checkedState, setCheckedState] = useState(
    new Array(genderOptions.length).fill(false)
  );

  const handleGenderClick = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const initialGenderArr = updatedCheckedState.map((item, index) => {
      if (item === true) {
        return genderOptions[index]
      }
    });
    const genderArray = initialGenderArr.filter(item => item !== undefined)

    setFormState({
      ...formState,
      preference: genderArray,
    });

    console.log('genderArray:')
    console.log(genderArray)
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-500">Signup</h2>
        </div>
        <form
          // className="mt-8 space-y-6" 
          onSubmit={handleFormSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstname" className="">
                First Name:
              </label>
              <input
                placeholder="First Name"
                name="firstname"
                type="text"
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
                type="text"
                id="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                required
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
                type="text"
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
                type="text"
                id="password"
                required
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
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="">
                Location:
              </label>
              <select
                placeholder=""
                name="location"
                id="location"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              >
                {stateNames.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                placeholder=""
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              >
                <option></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
            <div>
              <label htmlFor="preference" className="">
                Preference:
              </label>
              {genderOptions.map((gender, index) => {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={gender}
                      name={gender}
                      value={gender}
                      checked={checkedState[index]}
                      onChange={() => handleGenderClick(index)}
                    />
                    <label htmlFor={gender} className="ml-1">{gender}</label>
                  </div>
                )
              })}
            </div>
            <div className="flex-row space-between my-2 flex flex-row ml-5">
              <div className="flex-row space-between mr-3">
                <label className="mr-1" htmlFor="agerangemin">Minimum Age:</label>
                <input
                  placeholder="min"
                  name="agerangemin"
                  type="number"
                  id="agerangemin"
                  className="font-bold w-12"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between">
                <label className="mr-1" htmlFor="agerangemax">Maximum Age:</label>
                <input
                  placeholder="max"
                  name="agerangemax"
                  type="number"
                  id="agerangemax"
                  className="font-bold w-12"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="aboutme" className="">
                About Me:
              </label>
              <textarea
                placeholder="Interests/Hobbies/Quirks"
                name="aboutme"
                type="text"
                id="aboutme"
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
                onChange={handleChange} />
              <label htmlFor="vax" className="ml-2 block text-sm text-pink-500">
                By clicking this button I certify that I am vaccinated against COVID-19
              </label>
            </div>
          </div>
        </form>
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