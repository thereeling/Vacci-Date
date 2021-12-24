const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: [18, 'Must be 18+ to use this app!']
        },
        location: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Non-binary']
        },
        preference: {
            type: String,
            required: true,
            enum: ['Men', 'Women', 'No Preference']
        },
        agerange: {
            // Number range validator I saw in stackoverflow, will test later
            min: {
                type: Number,
                min: 18,
                validate: {
                    validator: function(val){
                        const ageMax = this.target.agerange.max;
                        return (ageMax !== undefined ? val <= ageMax : true);
                    },
                    message: 'The MIN range with value {VALUE} must be <= the max range!'
                }
            },
            max: {
                type: Number,
                min: 18,
                validate: {
                    validator: function(val){
                        const ageMin = this.target.agerange.min;
                        return (ageMin !== undefined ? val >= ageMin : true);
                    },
                    message: 'The MIN range with value {VALUE} must be >= the min range!'
                }
            }
        },
        // Don't know what to put in hobby list, will bring to groups attention
        hobbies: [{
            type: String,
            enum: ['etc..']
        }],
        aboutme: {
            type: String,
            required: true,
            maxlength: 250
        },
        // Don't know how to implement img yet. Will probably be a link to amazon s3.
        img: {
            type: String,
        },
        /*
            How the 'Match/Like' functionality will work:  When you see a User YOU like and you click the 'Like' button, THAT USER's ID get's added to YOUR 'Likes' list.  Also, YOUR User ID will get added to THEIR 'Liked By' list.  Then Mongoose will perform a 'populate' operator that checks YOUR 'Likes' list AND 'Liked By' list to see if there are MATCHING USER ID's.  That User's ID will be added to YOUR matches list.  If you 'Dislike' a User, nothing will happen except a new User appearing on screen (People change their minds <3).
        */
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        likedby: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

// Try this method for population first

userSchema.virtual('matches', {
    ref: 'User',
    localField: 'likes',
    foreignField: 'likedby'
});

const User = model('User', userSchema);
const doc = User.findOne().populate('matches');

module.exports = User

