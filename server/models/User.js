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
            minlength: 6,
            maxlength: 12,
            required: true
            // maybe a match validator???
        },
        age: {
            type: Number,
            required: true,
            min: [18, 'Must be 18+ to use this app!']
        },
        location: {
            type: String,
            required: true
            // maybe match regex to not include numbers and special characters?
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Non-binary']
        },
        preference: [{
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Non-binary']
        }],
       
        agerangemin: {
            type: Number,
            min: 18,
            // validate: {
            //     validator: function(val){
            //         const ageMax = this.target.agerangemax;
            //         return (ageMax !== undefined ? val <= ageMax : true);
            //     },
            //     message: 'The MIN range with value {VALUE} must be <= the max range!'
            // }
        },
        agerangemax: {
            type: Number,
            min: 18,
            // validate: {
            //     validator: function(val){
            //         const ageMin = this.target.agerangemin;
            //         return (ageMin !== undefined ? val >= ageMin : true);
            //     },
            //     message: 'The MIN range with value {VALUE} must be >= the min range!'
            // }
        },
        aboutme: {
            type: String,
            required: true,
            maxlength: 250
        },
        // Don't know how to implement img yet. Will probably be a link to amazon s3.
        img: {
            type: String,
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            // unique: true
        }],
        likedby: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            // unique: true
        }],
        matches: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
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


const User = model('User', userSchema);
module.exports = User

