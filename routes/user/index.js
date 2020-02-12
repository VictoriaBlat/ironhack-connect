const router = require("express").Router();
const Job = require("../../models/jobs");
const User = require("../../models/user");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const checkForLogin = (req, res, next) => {
  console.log("-----> check for login");
  if (!req.user) {
    console.log("-----> not logged in");
    res.redirect("/");
    return;
  }
  console.log("-----> logged in");
  next();
};

const checkForActivated = (req, res, next) => {
  console.log("activated?:", req.user.activated);
  if (!req.user.activated) {
    res.render("user/firstLogin", {
      userId: req.user._id,
      layout: false,
      message: `It's your first login. Your have to set your name and password before you can login.`
    });
    return;
  } else {
    next();
  }
};

const sendInviteMail = email => {};

router.use(checkForLogin);
// router.use(checkForActivated);

router.get("/dashboard", checkForActivated, (req, res, next) => {
  console.log("-----> dashboard");
  console.log("-----> User:");

  if (req.user.role === "admin") {
    // const Promises = [
    //   User.find({ activated: true })
    //     .sort({ activatedAt: -1 })
    //     .limit(3),
    // ];

    User.find({ activated: true })
      .sort({ activatedAt: -1 })
      .limit(3)
      .then(userList => {
        console.log(userList);
        res.render("user/dashboard.hbs", {
          userList: userList
        });
        return;
      })
      .catch(err => {
        next(err);
      });
  } else {
    Job.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .then(jobsList => {
        // res.send(jobs);
        res.render("user/dashboard.hbs", {
          role: req.user.role,
          jobsList: jobsList
        });
        return;
      })
      .catch(err => {
        next(err);
      });
  }
});

router.post("/firstLogin/:id", (req, res, next) => {
  console.log("-----> First login Post");
  const userId = req.params.id;
  const { name, lastname, password, confirmPassword } = req.body;

  if (req.user.activated) {
    res.redirect("/");
  }

  if (name === "" || lastname === " " || password === "") {
    res.render("user/firstLogin", {
      name,
      lastname,
      layout: false,
      message: "Indicate username and password"
    });
    return;
  }

  if (password !== confirmPassword) {
    res.render("user/firstLogin", {
      name,
      lastname,
      layout: false,
      message: "Your password did not match"
    });
    return;
  }

  User.findById(userId).then(userDoc => {
    console.log("---> user found");
    if (userDoc === null) {
      res.render("user/firstLogin", {
        name,
        lastname,
        layout: false,
        message: "The username does not exists! Please, contact your admin."
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
        "profile.name": name,
        "profile.surname": lastname
      }
    )
      .then(result => {
        console.log("---> updated & activated User");
        res.redirect("/");
      })
      .catch(err => {
        next(err);
      });
  });
});

router.post("/addFavourites", (req, res) => {
  console.log("hey axios works", req.body);
  // User.findById(req.user._id,)
  //find user get the data and check if that job is already there or not if not
  User.findOneAndUpdate(req.user._id, { $push: { favJobs: req.body.id } })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/create", (req, res, next) => {
  if (req.user.role === "admin") {
    console.log("---> Create User allowed");

    res.render("user/createUser");
    return;
  }

  console.log("---> Create User Not allowed");
  res.redirect("/user/dashboard");
});
router.post("/create", (req, res, next) => {
  if (req.user.role === "admin") {
    console.log("---> Post Create User");
    console.log(req.body);

    const { email, role, opt } = req.body;

    if (opt != "on") {
      res.render("user/createUser", {
        email,
        role,
        message: "Please confirm !"
      });
      return;
    }

    User.find({ email: email })
      .find(user => {
        console.log(user);

        if (user === null) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync("1234", salt);

          User.create({ email: email, role: role, password: hashPass })
            .then(user => {
              res.redirect("/" + user._id);
              return;
            })
            .catch(err => next(err));
        } else {
          res.render("user/createUser", {
            email,
            role,
            message: "User already exists"
          });
          return;
        }
      })
      .catch(err => next(err));

    return;
  }

  console.log("---> Create User Not allowed");
  res.redirect("/user/dashboard");
});

router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  const visitorId = req.user._id;
  console.log("---> User profile of: ", userId);
  User.findById(userId).then(user => {
    let allowed = user._id.toString() === visitorId.toString() ? true : false;
    if (req.user.role === "admin") {
      allowed = true;
    }

    console.log(allowed, user._id, visitorId);
    res.render("user/profile", { user: user, allowed });
    return;
  });
});
module.exports = router;
