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
    <div className="flex font-serif">
      <div className="flex-none w-52 relative">
        <Link to="/login">← Go to Login</Link>
      </div>
      <h2>Signup</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="text"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="username">Username:</label>
          <input
            placeholder="username"
            name="username"
            type="text"
            id="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="text"
            id="password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="firstname">First Name:</label>
          <input
            placeholder="First"
            name="firstname"
            type="text"
            id="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            placeholder=""
            required
            onChange={handleChange}
          >
            <option></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label className="font-bold mr-2" htmlFor="age">Age:</label>
          <input
            placeholder="age"
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
            placeholder=""
            name="location"
            id="location"
            onChange={handleChange}
          >
            {stateNames.map(state => <option value={state}>{state}</option>)}
          </select>
        </div>
        <p className="font-bold mr-2 " htmlFor="preference">Preferences:</p>
        <div>
          <div className="flex-row space-between my-2 flex flex-row ml-5">
            {genderOptions.map((gender, index) => {
              return (
                <div key={index} className="mr-3">
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
        </div>
        <div className="my-2">
          <label className="font-bold mr-2" htmlFor="aboutme">About Me:</label>
          <textarea
            placeholder="Interests/Hobbies/Quirks"
            name="aboutme"
            id="aboutme"
            className="block w-full my-2 mx-5"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="vax">By clicking this button I certify that I am vaccinated against COVID-19 </label>
          <input
            name="vax"
            type="radio"
            id="vax"
            required
            onChange={handleChange} />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;