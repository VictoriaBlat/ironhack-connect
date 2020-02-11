const mongoose = require('mongoose');
require('dotenv').config();
const promises = [];
// Mongoose connect

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('connected to DB for seed');
});

// USER - Seeds
const User = require('../models/user');
const bcrypt = require('bcrypt');

const defaultUser = [
  //admin
  {
    email: 'admin@ironhack-connect.de',
    role: 'admin',
    password: 1234,
  },
  //user1
  {
    email: 'user1@ironhack-connect.de',
    password: 1234,
  },
  //moderator
  {
    email: 'moderator@ironhack-connect.de',
    role: 'moderator',
    password: 1234,
  },
];
User.collection.drop();

promises.push(
  User.create(defaultUser).then((result) => {
    console.log(result);
  }),
);

// JOB-Seeds
// TODO: Create the jobsSeed
const defaultJobs = [{}];

// Wait for all Promisses and close the connection afterwards

Promise.all(promises).then((result) => {
  console.log('Seeds finished');
  mongoose.connection.close();
});
