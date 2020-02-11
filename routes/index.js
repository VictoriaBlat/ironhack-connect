const express = require("express");
const router = express.Router();
const Job = require("../models/jobs");

/* GET home page */
router.get('/', (req, res, next) => {
  //updated header

  //redirect to feed, if a session exists
  if (req.user) {
    res.redirect('/feed');
    return;
  }
  //redirect to feed, if a session exists
  res.redirect('/login');
  return;
});

/*Page with the recently added, should appear once the user is logged in*/

router.get("/recent", (req, res, next) => {
  Job.find({})
    .then(jobDocuments => {
      res.render("job/recent.hbs", { jobRecentList: jobDocuments });
    })
    .catch(err => {
      next(err);
    });
});

/*Job Search results*/

router.get("/jobs-search", (req, res) => {
  //const userInput = req.query.job;
  res.render("job/results");
});
/*Profile view*/

router.get("/userId", (req, res) => {
  res.render("profile");
});

module.exports = router;
