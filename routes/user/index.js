const router = require('express').Router();
const Job = require('../../models/jobs');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const checkForLogin = (req, res, next) => {
  console.log('-----> check for login');
  if (!req.user) {
    console.log('-----> not logged in');
    res.redirect('/');
    return;
  }
  console.log('-----> logged in');
  next();
};

const checkForActivated = (req, res, next) => {
  console.log('activated?:', req.user.activated);
  if (!req.user.activated) {
    res.render('user/firstLogin', {
      userId: req.user._id,
      layout: false,
      message: `It's your first login. Your have to set your name and password before you can login.`,
    });
    return;
  } else {
    next();
  }
};

router.use(checkForLogin);
// router.use(checkForActivated);

router.get('/dashboard', checkForActivated, (req, res, next) => {
  console.log('-----> dashboard');
  console.log('-----> User:');

  if (req.user.role === 'admin') {
  }

  Job.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .then((jobs) => {
      // res.send(jobs);
      res.render('user/dashboard.hbs', {
        role: req.user.role,
        jobRecentList: jobs,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/firstLogin/:id', (req, res, next) => {
  console.log('-----> First login Post');
  const userId = req.params.id;
  const { name, lastname, password, confirmPassword } = req.body;

  if (req.user.activated) {
    res.redirect('/');
  }

  if (name === '' || lastname === ' ' || password === '') {
    res.render('user/firstLogin', {
      name,
      lastname,
      layout: false,
      message: 'Indicate username and password',
    });
    return;
  }

  if (password !== confirmPassword) {
    res.render('user/firstLogin', {
      name,
      lastname,
      layout: false,
      message: 'Your password did not match',
    });
    return;
  }

  User.findById(userId).then((userDoc) => {
    console.log('---> user found');
    if (userDoc === null) {
      res.render('user/firstLogin', {
        name,
        lastname,
        layout: false,
        message: 'The username does not exists! Please, contact your admin.',
      });
    }
    // Can be deleted?

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    return User.updateOne(
      { _id: userId },
      {
        password: hashPass,
        activated: true,
        activatedAt: new Date(),
        'profile.name': name,
        'profile.surname': lastname,
      },
    )
      .then((result) => {
        console.log('---> updated & activated User');
        res.redirect('/');
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = router;
