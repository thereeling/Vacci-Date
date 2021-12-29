const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
   
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
          },
        all: async (parent) => {
          const userData = await User.find()
          return userData
        }
    },

    Mutation: {
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
        addUser: async (parent, args) => {
            const user = await User.create(args.input);
            const token = signToken(user);
        
            return { token, user };
        },
        like: async (parent, args, context) => {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id }, 
            {$push: {likes: { _id: args._id}}},
            { new: true}
          )
          if(!updatedUser){
            throw new AuthenticationError('Could not find a User with this ID!');
          }
          return updatedUser;
        },
        likedby: async (parent, args, context) => {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: args._id }, 
            {$push: {likedby: { _id: context.user._id}}},
            { new: true}
          )
          if(!updatedUser){
            throw new AuthenticationError('Could not find a User with this ID!');
          }
          return updatedUser;
        }
        // match: async (parent, args, context) => {
        //   console.log(context.user);
        //   let matcharr = [];
        //   for (let i = 0; i < context.user.likes.length; i++) {
              
        //       for (let j = 0; j < context.user.likedby.length; j++) {
        //           if(likes[i] === likedby[j]){
        //               matcharr.push(likes[i])
        //           }
        //       }    
        //   }
        //   console.log(matcharr);
        //   const updatedUser = await User.findByIdAndUpdate(
        //     { _id: context.user._id }, 
        //     {$push: {matches: {matcharr}}},
        //     { new: true}
        //   )
        //   if(!updatedUser){
        //     throw new AuthenticationError('Could not find a User with this ID!');
        //   }
        //   console.log(updatedUser.matches);
        //   return updatedUser;
        // }
    }
};

module.exports = resolvers;