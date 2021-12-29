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
        agerangemin: Int
        agerangemax: Int
        hobbies: String
        aboutme: String
        likes: [String]
        likedby: [String]
        matches: [String]
    
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
    all: [User]
    me: User
    }

    input UserInput {
        username: String
        firstname: String
        email: String
        password: String
        age: Int
        location: String
        gender: String
        preference: String
        agerangemin: Int
        agerangemax: Int
        hobbies: String
        aboutme: String
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(input: UserInput): Auth
        like(_id: ID): User
        likedby(_id: ID): User
        match: User
    }
`;

module.exports = typeDefs;