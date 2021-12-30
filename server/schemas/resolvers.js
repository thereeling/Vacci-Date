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
      const user = await User.findOne({ username })

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
      // Logout will be handled with front end
    },

    addUser: async (parent, args) => {
      const user = await User.create(args.input)
      const token = signToken(user);
  
      return { token, user };
    },

    deleteUser: async (parent, args, context) => {
      const userToDelete = await User.findByIdAndDelete(
        { _id: context.user._id },
        { new: false}
      )
        
      if (!userToDelete) {
        throw new AuthenticationError('Could not find a User with this username!');
      }

      return userToDelete;
     /*
      We need to logout, unlike the deleted users ID in other users, unlikedby the deleted users ID in other users, and unmatch with the other users
     */
    },

    like: async (parent, args, context) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id }, 
        { $addToSet: { likes: { _id: args._id } } },
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
        { $addToSet: { likedby: { _id: context.user._id } } },
        { new: true}
      )

      if(!updatedUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }

      return updatedUser;
    },
  
    match: async (parent, args) => {
      // Maybe use context.user._id
      const me = await User.findOne({ _id: args._id })
      
      const matchArray = me.likes.filter(matchId => me.likedby.includes(matchId));
      const updatedUser = await User.findOneAndUpdate(
        { _id: args._id }, 
        { $addToSet: { matches: { $each: matchArray } } },
        { new: true}
      )

      if(!updatedUser){
        throw new AuthenticationError('Could not find a User with this username!');
      }

      return updatedUser;
    },

    unlike: async (parent, { _id }, context) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id }, 
        { $pull: { likes: _id } },
        { new: true}
      )
      if(!updatedUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }

      return updatedUser;
    },

    unlikedby: async (parent, args, context) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: args._id }, 
        { $pull: { likedby: context.user._id } },
        { new: true}
      )

      if(!updatedUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }

      return updatedUser;
    },

    unmatch: async (parent, args) => {
      // Maybe use context.user._id
      const me = await User.findOne({ _id: args._id })
        .select('-__v -password')

      // Create a reference to the pre-existing matches array
      const previousMatches = me.matches

      // Create a new array from the intersection of likes and likedby
      const updatedMatches = me.likes.filter(matchId => me.likedby.includes(matchId));

      // Create an array of all pre-existing matches no longer included in the new array
      let deletedMatches = previousMatches.filter(match => !updatedMatches.toString().includes(match));

      const updatedUser = await User.findByIdAndUpdate(
        { _id: args._id }, 
        // Remove all values no longer included in the updatedMatches array
        { $pullAll: { matches: deletedMatches } },
        { new: true}
      )

      if(!updatedUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }
      
      return updatedUser;
    },
  }
};

module.exports = resolvers;