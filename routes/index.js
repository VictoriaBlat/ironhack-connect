const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*Page with the recently added*/

router.get("/recent", (req, res, next) => {
  res.render("recent");
});

/*Search results*/

router.get("/jobs-search", (req, res) => {
  //const userInput = req.query.job;
  res.render("results");
});
/*Profile view*/

router.get("/userId", (req, res) => {
  res.render("profile");
});
/*Add new Jobs*/
router.get("/jobs/new", (req, res) => {
  res.render("addNewJob");
});

/*Delete Jobs*/

router.post("/jobs", (req, res, next) => {
  Jobs.create({
    name: res.body.name
    //check schema
  })
    .then(createdJob => {
      res.redirect("/jobs/${createdJob._id}");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/jobs/:id/delete", (req, res) => {
  Jobs.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/jobs");
    })
    .catch(err => {
      next(err);
    });
});
/*Edit Jobs*/

router.get("/jobs/:id/edit", (req, res, next) => {
  Jobs.finsById(req.params.id)
    .then(jobDocuments => {
      res.render("jobsEdit.hbs", jobDocuments);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
