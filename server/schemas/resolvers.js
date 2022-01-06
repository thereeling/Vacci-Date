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

    updateUser: async (parent, args, context) => {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          args.input,
          { new: true}
        )
        if (!updatedUser) {
          throw new AuthenticationError('Could not find a User with this username!');
        }
        return updatedUser
    },

    deleteUser: async (parent, args, context) => {
      const id = context.user._id;
      // Update ALL Users and pull the LOGGED IN users ID FROM all Users.  Pulling from ALL fields that the logged in Users ID will be
      const updateAllUsers = await User.updateMany(
        { $pull: { likes: id, likedby: id, matches: id } },
      )
      if(!updateAllUsers){
        throw new AuthenticationError;
      }

      // After we removed the logged in Users, we will DELETE the logged in User from the collection.  We want to do this after the updateMany so our context._id is readable

      const userToDelete = await User.findByIdAndDelete(
        { _id: context.user._id },
        { new: false}
      )

      if (!userToDelete) {
        throw new AuthenticationError('Could not find a User with this username!');
      }

      return userToDelete;
    },

    like: async (parent, args, context) => {
      // Find the user from the local storage token & push the user id from the args into the likes array of the loggedIn user
      const loggedInUser = await User.findByIdAndUpdate(
        { _id: context.user._id }, 
        { $addToSet: { likes: { _id: args._id } } },
        { new: true}
      )
      if(!loggedInUser){
        throw new AuthenticationError;
      }

      // Check for matches in the loggedIn user; add to matches field
      const loggedInMatchArray = loggedInUser.likes.filter(matchId => loggedInUser.likedby.includes(matchId));
      const loggedInUser2 = await User.findByIdAndUpdate(
        { _id: context.user._id }, 
        { $addToSet: { matches: { $each: loggedInMatchArray } } },
        { new: true}
      )

      // Find the user from the args & push the loggedIn user id into the likedby array of the likedUser
      const likedUser = await User.findByIdAndUpdate(
        { _id: args._id }, 
        { $addToSet: { likedby: { _id: context.user._id } } },
        { new: true}
      )
      if(!likedUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }

      // Check for matches in the likedUser; add to matches field
      const likedMatchArray = likedUser.likes.filter(matchId => likedUser.likedby.includes(matchId));
      const likedUser2 = await User.findByIdAndUpdate(
        { _id: args._id }, 
        { $addToSet: { matches: { $each: likedMatchArray } } },
        { new: true}
      )

      return [loggedInUser2, likedUser2];
    },

    unlike: async (parent, args, context) => {
      // Find the user from the local storage token & pull the user id from the args from the likes array of the loggedIn user
      const loggedInUser = await User.findByIdAndUpdate(
        { _id: context.user._id }, 
        { $pull: { likes: args._id } },
        { new: true}
      )
      if(!loggedInUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }

      // Check for matches in the loggedIn user; remove broken matches
      const loggedInPreviousMatches = loggedInUser.matches
      const loggedInUpdatedMatches = loggedInUser.likes.filter(matchId => loggedInUser.likedby.includes(matchId));
      let loggedInDeletedMatches = loggedInPreviousMatches.filter(match => !loggedInUpdatedMatches.toString().includes(match));
      const loggedInUser2 = await User.findByIdAndUpdate(
        { _id: context.user._id }, 
        { $pullAll: { matches: loggedInDeletedMatches } },
        { new: true}
      )

      // Find the user from the args & pull the loggedIn user id out of the likedby array of the unlikedUser
      const unlikedUser = await User.findByIdAndUpdate(
        { _id: args._id }, 
        { $pull: { likedby: context.user._id } },
        { new: true}
      )
      if(!unlikedUser){
        throw new AuthenticationError('Could not find a User with this ID!');
      }

      // Check for matches in the unlikedUser; remove broken matches
      const unlikedPreviousMatches = unlikedUser.matches
      const unlikedUpdatedMatches = unlikedUser.likes.filter(matchId => unlikedUser.likedby.includes(matchId));
      let unlikedDeletedMatches = unlikedPreviousMatches.filter(match => !unlikedUpdatedMatches.toString().includes(match));
      const unlikedUser2 = await User.findByIdAndUpdate(
        { _id: args._id }, 
        { $pullAll: { matches: unlikedDeletedMatches } },
        { new: true}
      )

      return [loggedInUser2, unlikedUser2];
    }
  }
};

module.exports = resolvers;