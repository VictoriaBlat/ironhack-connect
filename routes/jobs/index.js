/*Profile view*/

const express = require('express');
const router = express.Router();
const Job = require('../../models/jobs');

/*Add new Jobs*/

router.get('/new', (req, res) => {
  console.log('add new route');
  res.render('job/addNewJob');
});

router.post('/', (req, res, next) => {
  console.log({ ...req.body });

  Job.create({ ...req.body, author: req.user._id })
    .then((createdJob) => {
      // res.send(createdJob);
      res.redirect(`jobs/${createdJob._id}`);
    })
    .catch((err) => {
      next(err);
    });

  // Job.create({
  //   title: res.body.title,
  //   company: res.body.company,
  //   companyUrl: res.body.companyUrl,
  //   description: res.body.description,
  //   contractType: res.body.contractType,
  //   industry: res.body.industry,
  //   category: res.body.category,
  //   location: res.body.location,
  //   author: res.body.author,
  //   startsAt: res.body.startsAt,
  // })
  //   .then((createdJob) => {
  //     res.redirect('/jobs/${createdJob._id}');
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

/*Job details*/
router.get('/:id', (req, res) => {
  console.log('Hello');

  const jobId = req.params.id;
  const userId = req.user._id;

  // userId --> req.user._id
  // Job.author._id -->
  Job.findById(jobId)
    .populate('author')
    .then((JobInfo) => {
      console.log(JobInfo);

      if (jobId === userId || req.user.role === 'admin') {
        const j = JobInfo.toString();

        res.render('job/jobPage.hbs', { jobInfo: JobInfo, allowed: true });
        return;
      }

      res.render('job/jobPage.hbs', JobInfo);
    })
    .catch((err) => {
      next(err);
    });
});

/*Delete Jobs*/
router.get('/:id/delete', (req, res) => {
  Job.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('/jobs');
    })
    .catch((err) => {
      next(err);
    });
});
/*Edit Jobs*/

router.get('/jobs/:id/edit', (req, res, next) => {
  Jobs.finsById(req.params.id)
    .then((jobDocuments) => {
      res.render('jobs/jobsEdit.hbs', jobDocuments);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
