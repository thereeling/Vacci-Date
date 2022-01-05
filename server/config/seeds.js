const db = require('./connection');
const { User } = require('../models');
const bcrypt = require('bcrypt');

db.once('open', async () => {
    await User.deleteMany();
    await User.insertMany([
        {
           username: 'nickiscool',
           firstname: 'Nick',
           email: 'nick@nick.com',
           password: 'password',
           age: 27,
           location: 'CT',
           gender: 'Male',
           preference: ['Female'],
           agerangemin: 25,
           agerangemax: 30,
           aboutme: 'Loves long walks on the Beach, listening to music and living everyday like it is my last!',
           image: 'https://vaccidate-images2.s3.amazonaws.com/27yearOldMale.jpeg'
        },
        {
            username: 'coolgirl',
            firstname: 'chelsea',
            email: 'chelsea@chelsea.com',
            password: 'password',
            age: 22,
            location: 'CT',
            gender: 'Female',
            preference: ['Male', 'Female'],
            agerangemin: 24,
            agerangemax: 28,
            aboutme: 'I love Chelsea FC. There is something about winter and sitting by a fire with a drink in my hand that lets me know this life is worth living.',
            image: 'https://vaccidate-images2.s3.amazonaws.com/22yearoldwoman.jpeg'
         },
         {
            username: 'singlemale1',
            firstname: 'Hank',
            email: 'Hank@Hank.com',
            password: 'password',
            age: 55,
            location: 'CT',
            gender: 'Male',
            preference:['Female'],
            agerangemin: 50,
            agerangemax: 56,
            aboutme: 'Propane and propane accessories what everyone wants. I do not have an anger problem, I have an idiot problem!',
            image: 'https://vaccidate-images2.s3.amazonaws.com/55yearoldmale.jpeg'
         },
         {
            username: 'singlfemale1',
            firstname: 'Patti',
            email: 'Patti@Patti.com',
            password: 'password',
            age: 34,
            location: 'CT',
            gender: 'Female',
            preference: ['Female', 'Male', 'Non-binary'],
            agerangemin: 30,
            agerangemax: 40,
            aboutme: 'I like to sit around and read a good book and talk, but sometimes I like to go and play laser tag.', 
            image: 'https://vaccidate-images2.s3.amazonaws.com/34yearoldwoman.jpeg'
         },
         {
            username: 'singlenonbi1',
            firstname: 'Franklin',
            email: 'Franklin@Franklin.com',
            password: 'password',
            age: 29,
            location: 'CT',
            gender: 'Non-binary',
            preference: ['Male', 'Female', 'Non-binary'],
            agerangemin: 30,
            agerangemax: 40,
            aboutme: 'Sometimes it takes a while for me to come out of my shell, but when I do, its all fun and memories to make.',
            image: 'https://vaccidate-images2.s3.amazonaws.com/29yearoldmale.jpeg'
         },
         {
            username: 'singlemale2',
            firstname: 'Xavier',
            email: 'Xavier@Xavier.com',
            password: 'password',
            age: 45,
            location: 'CT',
            gender: 'Male',
            preference: ['Female', 'Male'],
            agerangemin: 30,
            agerangemax: 47,
            aboutme: 'There are only a few things that can get me excited. Getting to know you and wondering when our next date is going to be.',
            image: 'https://vaccidate-images2.s3.amazonaws.com/45yearoldmale.jpeg'
         },
         {
            username: 'singlefemale2',
            firstname: 'Karen',
            email: 'Karen@Karen.com',
            password: 'password',
            age: 58,
            location: 'CT',
            gender: 'Female',
            preference: ['Male', 'Female'],
            agerangemin: 30,
            agerangemax: 47,
            aboutme: 'I will not want to speak to the manger when I am around you. I believe in natural remedies to solve all problems. Except COVID. GET VACCINATED!',
            image: 'https://vaccidate-images2.s3.amazonaws.com/58yearoldwoman.jpeg'
         },
         {
            username: 'singlemale3',
            firstname: 'Dude',
            email: 'Dude@Dude.com',
            password: 'password',
            age: 38,
            location: 'CT',
            gender: 'Male',
            preference: ['Non-binary'],
            agerangemin: 30,
            agerangemax: 47,
            aboutme: 'Man, hanging by the beach is the best. Surfing and skating are awesome. Let us all just chill a little and just relax man.',
            image: 'https://vaccidate-images2.s3.amazonaws.com/38yearoldmale.jpeg'
         },
    ])
    console.log('Users seeded!');
    process.exit();
});