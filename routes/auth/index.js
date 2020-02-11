const express = require('express');
const passport = require('passport');
const router = express.Router();

// login
// login GET

router.get('/login', (req, res, next) => {
  res.render('user/login', { message: req.flash('error'), layout: false });
});

// login POST
// the post request calls passport.authenticate and
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true,
  }),
);

router.get('/firstLogin', (req, res) => {
  // ironhack-connect.herokuapp.com/firstLogin?userId=xyz
  const userId = req.params.userId;
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//createUser , just for admins ==> other route

router.get('/createUser');
router.post('/createUser', (req, res, next) => {
  /* A new  */
});

module.exports = router;
