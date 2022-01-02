import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                _id   
            }
            token
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($input: UserInput) {
        addUser(input: $input) {
            token
            user {
                _id
                username
                firstname
                email
                age
                location
                gender
                preference
                agerangemin
                agerangemax
                hobbies
                aboutme
                likes
                likedby
                matches
            }
        }
    }
`;

export const UPDATE_USER = gql `
    mutation UpdateUser($input: UserInput) {
        updateUser(input: $input) {
            _id
            firstname
            username
            email
            age
            location
            gender
            preference
            agerangemin
            agerangemax
            hobbies
            aboutme
        }
    }
`;

export const DELETE_USER = gql `
    mutation DeleteUser {
        deleteUser {
            _id
            username
            firstname
            email
            likedby
            likes
            matches   
        }
    }
`;

export const LIKE_USER = gql`
    mutation Like($_id: ID) {
        like(_id: $_id) {
            _id
            likedby
            likes
            matches
            username
        }
    }
`;

export const UNLIKE_USER = gql`
    mutation UnLike($_id: ID) {
        unlike(_id: $_id) {
            _id
            likes
            likedby
            matches
            username
        }
    }

`;

