const router = require('express').Router();

const checkForLogin = (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
    return;
  }

  next();
};

router.use(checkForLogin);
router.get('/feed');

module.exports = router;
