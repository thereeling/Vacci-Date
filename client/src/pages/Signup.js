import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                username: formState.username,
                age: formState.age,
                location: formState.location,
                gender: formState.gender,
                preferance: formState.preferance,
                aboutMe: formState.aboutMe,
                img: formState.img
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
        <div className="flex font-serif">
          <div className="flex-none w-52 relative">
            <Link to="/login">← Go to Login</Link>
          </div>
  
        <form className="flex-auto p-6" onSubmit={handleFormSubmit}>
          <h2 className="w-full flex-none mb-3 text-xl leading-none text-gray-900">
            Signup
          </h2>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="username">Username:</label>
            <input
              placeholder="username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="userAge">Age:</label>
            <input
              placeholder="age"
              name="age"
              type="age"
              id="userAge"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="location">Location:</label>
            <input
              placeholder="Anywhere, USA"
              name="location"
              type="location"
              id="location"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="gender">Gender:</label>
            <input
              placeholder="M/F/Other"
              name="gender"
              type="gender"
              id="gender"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="pref">Preference:</label>
            <input
              placeholder="M/F/Other"
              name="preference"
              type="preference"
              id="pref"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="about">About Me:</label>
            <input
              placeholder="Interests/Hobbies/Quirks"
              name="about"
              type="about"
              id="about"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-baseline">
            <label htmlFor="img">Upload:</label>
            <input
              placeholder="img"
              name="img"
              type="img"
              id="img"
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <button className="flex-none w-1/2 h-12 uppercase font-medium tracking-wider bg-gray-900 text-white" type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
};

export default Signup;