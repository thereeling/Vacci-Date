const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        firstname: String
        email: String!
        age: Int
        location: String
        gender: String
        preference: String
        agerange.min: Int
        agerange.max: Int
        hobbies: String
        aboutme: String
        likes: [String]
        likedby: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
    me: User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;