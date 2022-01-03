import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query GetMe {
        me {
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
`;

export const QUERY_ALL_USERS = gql`
    query All{
        all {
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
`;