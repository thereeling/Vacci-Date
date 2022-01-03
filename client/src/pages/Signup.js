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
        <div className="container my-1">
        <Link to="/login">← Go to Login</Link>
  
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstname">First Name:</label>
            <input
              placeholder="First"
              name="firstname"
              type="firstname"
              id="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username:</label>
            <input
              placeholder="username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="age">Age:</label>
            <input
              placeholder="age"
              name="age"
              type="number"
              id="age"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="location">Location:</label>
            <input
              placeholder="Anywhere, USA"
              name="location"
              type="location"
              id="location"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="gender">Gender:</label>
            <input
              placeholder="M/F/Other"
              name="gender"
              type="gender"
              id="gender"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="preference">Preference:</label>
            <input
              placeholder="M/F/Other"
              name="preference"
              type="preference"
              id="preference"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="about-me">About Me:</label>
            <input
              placeholder="Interests/Hobbies/Quirks"
              name="aboutme"
              type="text"
              id="about-me"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="img">Upload:</label>
            <input
              placeholder="img"
              name="img"
              type="img"
              id="img"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
};

export default Signup;