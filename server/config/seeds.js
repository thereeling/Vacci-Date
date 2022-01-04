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
           aboutme: 'This is a test for testing things'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
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
            aboutme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo eget. Pellentesque sit amet porttitor eget dolor morbi non.'
         },
    ])
    console.log('Users seeded!');
    process.exit();
});