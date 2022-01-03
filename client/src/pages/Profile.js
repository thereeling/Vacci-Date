import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = (props) => {
  const { loading, data, error } = useQuery(QUERY_USER);

  const my = data?.me || {};
  console.log(my);

  const [formState, setFormState] = useState({ email: '', password: ''});

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className = "container">
      <h2>Hello, {my.firstname}</h2>
      <form onSubmit = {handleFormSubmit}>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "firstname">First Name:</label>
          <input
            placeholder = {my.firstname}
            name = "firstname"
            type = "firstname"
            id = "firstname"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "username">Username:</label>
          <input
            placeholder = {my.username}
            name = "username"
            type = "username"
            id = "username"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "email">Email:</label>
          <input
            placeholder = "youremail@test.com"
            name = "email"
            type = "email"
            id = "email"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "password">Password:</label>
          <input
            placeholder = "******"
            name = "password"
            type = "password"
            id = "password"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "age">Age:</label>
          <input
            placeholder = "age"
            name = "age"
            type = "number"
            id = "age"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "location">Location:</label>
          <input
            placeholder = "Anywhere, USA"
            name = "location"
            type = "location"
            id = "location"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "gender">Gender:</label>
          <input
            placeholder = "M/F/Other"
            name = "gender"
            type = "gender"
            id = "gender"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "preference">Preference:</label>
          <input
            placeholder = "M/F/Other"
            name = "preference"
            type = "preference"
            id = "preference"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "about-me">About Me:</label>
          <input
            placeholder = "Interests/Hobbies/Quirks"
            name = "aboutme"
            type = "text"
            id = "about-me"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row space-between my-2">
          <label htmlFor = "img">Upload:</label>
          <input
            placeholder = "img"
            name = "img"
            type = "img"
            id = "img"
            // onChange={handleChange}
          />
        </div>
        <div className = "flex-row flex-end">
          <button type = "submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;