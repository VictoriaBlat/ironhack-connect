const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');

/* GET home page */

/*if you are logged in, than go to dashboard, else go to login*/

router.get('/', (req, res, next) => {
  //updated header
  console.log(`login ${req.user}`)
  //redirect to feed, if a session exists
  if (req.user) {
    res.redirect('/user/dashboard');
    return;
  }
  //redirect to feed, if a session exists
  res.redirect("/login");
  return;
});

/*Page with the recently added, should appear once the user is logged in*/

/*Job Search results*/

// router.get("/jobs-search", (req, res) => {
//   //const userInput = req.query.job;
//   res.render("job/results");
// });
// /*Profile view*/

// router.get("/userId", (req, res) => {
//   res.render("profile");
// });

module.exports = router;
