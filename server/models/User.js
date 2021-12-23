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
            required: true,
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
        hobbies: {
            type: String,
            enum: ['etc..']
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
        matches: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);
