const express = require('express');
const router = express.Router();

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

/*Page with the recently added*/

router.get('/recent', (req, res, next) => {
  res.render('recent');
});

/*Search results*/

router.get('/jobs-search', (req, res) => {
  //const userInput = req.query.job;
  res.render('results');
});
/*Profile view*/

router.get('/userId', (req, res) => {
  res.render('profile');
});

module.exports = router;
