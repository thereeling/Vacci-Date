import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';
import stateNames from '../utils/stateNames';
import genderOptions from '../utils/genderOptions';
import Auth from '../utils/auth'

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
  const [formState, setFormState] = useState();
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formState.agerangemax < formState.agerangemin) {
      return alert('Your minimum age is higher than your minimum age!')
    }
    await updateUser({
      variables: {
        input:
        {
          email: formState.email || my.email,
          username: formState.username || my.username,
          password: formState.password || my.password,
          firstname: formState.firstname || my.firstname,
          gender: formState.gender || my.gender,
          age: parseInt(formState.age) || parseInt(my.age),
          location: formState.location || my.location,
          preference: formState.preference || my.preference,
          agerangemin: parseInt(formState.agerangemin) || parseInt(my.agerangemin),
          agerangemax: parseInt(formState.agerangemax) || parseInt(my.agerangemax),
          aboutme: formState.aboutme
        }
      },
    });
    alert('Your profile has been successfully updated!')
    window.location.assign('/dashboard');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const { data, error: userError } = useQuery(QUERY_USER);
  const my = data?.me || {};

  // We need to set checkedState based on the queried preferences
  const genderState = genderOptions.map(function (gender) {
    if (my.preference.includes(gender)) {
      return true
    } else {
      return false
    }
  });

  const [checkedState, setCheckedState] = useState(genderState);

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
  }

  const handleDelete = async (event) => {
    if (window.confirm("Do you really want to delete your profile?")) {
      await deleteUser();
      Auth.logout();
    }
  }

  return (
    <div className="container max-w-3xl m-auto p-5">
      <h2 className="text-3xl text-center">Hello, {my.firstname}!</h2>
      <p className="text-center mb-5">Here, you can update your Vacci-Date Profile.</p>

      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="username">Your Username:</label>
          <input
            defaultValue={my.username}
            name="username"
            type="text"
            id="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="email">Account Email:</label>
          <input
            defaultValue={my.email}
            name="email"
            type="text"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            defaultValue={my.gender}
            required
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="age">Age:</label>
          <input
            defaultValue={my.age}
            name="age"
            type="number"
            id="age"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-1" htmlFor="location">Location:</label>
          <select
            defaultValue={my.location}
            name="location"
            id="location"
            onChange={handleChange}
          >
            {stateNames.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
        </div>
        <p className="font-bold mr-2 " htmlFor="preference">Preferences:</p>
        <div>
          <div className="flex-row space-between my-2 flex flex-row ml-5">
            {genderOptions.map((gender, index) => {
              return (
                <div key={index} className="mr-3">
                  {my.preference.includes(gender) ?
                    <input
                      type="checkbox"
                      id={gender}
                      name={gender}
                      value={gender}
                      defaultChecked="checked"
                      onChange={() => handleGenderClick(index)}
                    />
                    :
                    <input
                      type="checkbox"
                      id={gender}
                      name={gender}
                      value={gender}
                      onChange={() => handleGenderClick(index)}
                    />
                  }
                  <label htmlFor={gender} className="ml-1">{gender}</label>
                </div>
              )
            })}
          </div>
          <div className="flex-row space-between my-2 flex flex-row ml-5">
            <div className="flex-row space-between mr-3">
              <label className="mr-1" htmlFor="agerangemin">Minimum Age:</label>
              <input
                defaultValue={my.agerangemin}
                name="agerangemin"
                type="number"
                id="agerangemin"
                className="font-bold w-11"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between">
              <label className="mr-1" htmlFor="agerangemax">Maximum Age:</label>
              <input
                defaultValue={my.agerangemax}
                name="agerangemax"
                type="number"
                id="agerangemax"
                className="font-bold w-11"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="my-2">
          <label className="font-bold mr-2" htmlFor="aboutme">About Me:</label>
          <textarea
            defaultValue={my.aboutme}
            name="aboutme"
            id="aboutme"
            className="block w-full my-2 mx-5"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="img">Avatar Selection:</label>
          <input
            placeholder="img"
            name="img"
            type="img"
            id="img"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center space-x-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;