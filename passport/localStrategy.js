const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      // because we are using email as username, we have to tell passport that
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((foundUser) => {
          // if user not found: message -> incorrect credentials
          if (!foundUser) {
            done(null, false, { message: 'Incorrect credentials' });
            return;
          }

          //if wrong password: message -> incorrect credentials
          if (!bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, { message: 'Incorrect credentials' });
            return;
          }

          done(null, foundUser);
        })
        .catch((err) => done(err));
    },
  ),
);
