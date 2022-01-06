import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';
import stateNames from '../utils/stateNames';
import genderOptions from '../utils/genderOptions';
import Auth from '../utils/auth'
import { Icon } from '@iconify/react';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
  const { data, loading, error: userError } = useQuery(QUERY_USER,{
    pollInterval: 500,
  });

  if(loading){
    <h1>LOADING...</h1>
  }
  const my = data?.me || {};
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
          aboutme: formState.aboutme,
          img: checkedAvatar
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

  // We need to set checkedState based on the queried preferences
  const genderState = genderOptions.map(function (gender) {
    if (my.preference.includes(gender)) {
      return true
    } else {
      return false
    }
  });

  const [checkedAvatar, setCheckedAvatar] = useState(`${my.img}`);

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
  const handleAvatarClick = (e) => {
    setCheckedAvatar(e.target.value)
  };

  const handleDelete = async (event) => {
    if (window.confirm("Do you really want to delete your profile?")) {
      await deleteUser();
      Auth.logout();
    }
  }

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6 font-mono">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-700">
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
                    <label className="block text-md font-medium text-gray-700" htmlFor="username">
                      My Username:
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="username"
                        name="username"
                        rows={1}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        required
                        defaultValue={my.username}
                        onChange={handleChange}
                      />
                    </div>
                    <label htmlFor="about-me" className="block text-md font-medium text-gray-700">
                      About Me:
                    </label>
                    <div className="mt-1">
                      <textarea
                        defaultValue={my.aboutme}
                        id="aboutme"
                        name="aboutme"
                        rows={3}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>
                  <div>
                    <label className="block text-md font-medium text-gray-700" htmlFor="avatarlist">
                      Avatar Selection:
                    </label>
                      <ul id='avatarlist' className="grid grid-cols-4 gap-x-5 m-10 max-w-md mx-auto">
                        <li className='relative'>
                          <input
                          className="sr-only peer"
                          placeholder="Please choose and image"
                          name="img"
                          type="radio"
                          id="maleavatar1"
                          defaultChecked={'https://vaccidate-images2.s3.amazonaws.com/maleavatar1.jpeg' === checkedAvatar}
                          value='https://vaccidate-images2.s3.amazonaws.com/maleavatar1.jpeg'
                          onChange={handleAvatarClick}
                          />
                          <label htmlFor='maleavatar1' className='flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-pink-500 peer-checked:ring-2 peer-checked:border-transparent'><img src='https://vaccidate-images2.s3.amazonaws.com/maleavatar1.jpeg' /></label>
                        </li>
                        <li className='relative'>
                          <input
                          className="sr-only peer"
                          placeholder="Please choose and image"
                          name="img"
                          type="radio"
                          id="maleavatar2"
                          defaultChecked={'https://vaccidate-images2.s3.amazonaws.com/maleavatar2.jpeg' === checkedAvatar}
                          value='https://vaccidate-images2.s3.amazonaws.com/maleavatar2.jpeg'
                          onChange={handleAvatarClick}
                          />
                          <label htmlFor='maleavatar2' className='flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-pink-500 peer-checked:ring-2 peer-checked:border-transparent'><img src='https://vaccidate-images2.s3.amazonaws.com/maleavatar2.jpeg' /></label>
                        </li>
                        <li className='relative'>
                          <input
                          className="sr-only peer"
                          placeholder="Please choose and image"
                          name="img"
                          type="radio"
                          id="femaleavatar1"
                          defaultChecked={'https://vaccidate-images2.s3.amazonaws.com/womanavatar1.jpeg' === checkedAvatar}
                          value='https://vaccidate-images2.s3.amazonaws.com/womanavatar1.jpeg'
                          onChange={handleAvatarClick}
                          />
                          <label htmlFor='femaleavatar1' className='flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-pink-500 peer-checked:ring-2 peer-checked:border-transparent'><img src='https://vaccidate-images2.s3.amazonaws.com/womanavatar1.jpeg' /></label>
                        </li>
                        <li className='relative'>
                          <input
                          className="sr-only peer"
                          placeholder="Please choose an image"
                          name="img"
                          type="radio"
                          id="femaleavatar2"
                          defaultChecked={'https://vaccidate-images2.s3.amazonaws.com/womanavatar2.jpeg' === checkedAvatar}
                          value='https://vaccidate-images2.s3.amazonaws.com/womanavatar2.jpeg'
                          onChange={handleAvatarClick}
                          />
                          <label htmlFor='femaleavatar2' className='flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-pink-500 peer-checked:ring-2 peer-checked:border-transparent'><img src='https://vaccidate-images2.s3.amazonaws.com/womanavatar2.jpeg' /></label>
                        </li>
                      </ul>
                  </div>
                </div>
                <div className="px-4 py-3 bg-pink-50 text-right sm:px-6">
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
              <h3 className="text-lg font-medium font-mono leading-6 text-gray-900">
                Personal Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="font-mono" onSubmit={handleFormSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-md font-medium text-gray-700">
                        Email address:
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={my.email}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-md font-medium text-gray-700" htmlFor="location">
                        Location:
                      </label>
                      <select
                        defaultValue={my.location}
                        name="location"
                        id="location"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      >
                        {stateNames.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="age" className="block text-md font-medium text-gray-700">
                        Age:
                      </label>
                      <input
                        defaultValue={my.age}
                        type="number"
                        name="age"
                        id="age"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="gender" className="block text-md font-medium text-gray-700">
                        My Gender:
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        defaultValue={my.gender}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="preference" className="block text-md font-medium text-gray-700">
                        Match Preferences:
                      </label>
                      {genderOptions.map((gender, index) => {
                        return (
                          <div key={index} className="mr-3">
                            <label htmlFor={gender} className="block text-sm font-medium text-gray-700">{gender}</label>
                            {my.preference.includes(gender) ?
                              <input
                              type="checkbox"
                              id={gender}
                              name={gender}
                              value={gender}
                              defaultChecked="checked"
                              className=""
                              onChange={() => handleGenderClick(index)}
                            />
                            :
                            <input
                              type="checkbox"
                              id={gender}
                              name={gender}
                              value={gender}
                              className=""
                              onChange={() => handleGenderClick(index)}
                            />
                            }
                          </div>
                        )
                      })}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="agerangemin" className="block text-sm font-medium text-gray-700">
                        Minimum Age:
                      </label>
                      <input
                        defaultValue={my.agerangemin}
                        id="agerangemin"
                        name="agerangemin"
                        type="number"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="agerangemax" className="block text-sm font-medium text-gray-700">
                        Maximum Age:
                      </label>
                      <input
                        defaultValue={my.agerangemax}
                        id="agerangemax"
                        name="agerangemax"
                        type="number"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-500 focus:z-10 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Save
                  </button>
                  <button
                    className="flex items-center bg-none hover:text-pink-600 text-black font-bold py-2 px-4 rounded" 
                    onClick={handleDelete} 
                  > 
                    Delete Profile 
                    <Icon icon="carbon:trash-can" color="black" width="20" height="20"/>
                    
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

export default Profile;