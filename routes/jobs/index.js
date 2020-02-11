/*Profile view*/

const express = require("express");
const router = express.Router();
const Job = require("../../models/jobs");

/*Add new Jobs*/
router.get("/new", (req, res) => {
  console.log("add new route");
  res.render("job/addNewJob");
});

router.post("/jobs", (req, res, next) => {
  Job.create({
    title: res.body.title,
    company: res.body.company,
    companyUrl: res.body.companyUrl,
    description: res.body.description,
    contractType: res.body.contractType,
    industry: res.body.industry,
    category: res.body.category,
    location: res.body.location,
    author: res.body.author,
    startsAt: res.body.startsAt
  })
    .then(createdJob => {
      res.redirect("/jobs/${createdJob._id}");
    })
    .catch(err => {
      next(err);
    });
});

/*Delete Jobs*/
router.get("/jobs/:id/delete", (req, res) => {
  Job.deleteOne({ _id: req.params.id })
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
      res.render("jobs/jobsEdit.hbs", jobDocuments);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
