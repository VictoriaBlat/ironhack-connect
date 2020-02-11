/*Profile view*/

const express = require('express');
const router = express.Router();

/*Add new Jobs*/
router.get('/new', (req, res) => {
  console.log('add new route');
  res.send('add new job');
  // res.render('addNewJob');
});

/*Delete Jobs*/

router.post('/jobs', (req, res, next) => {
  Jobs.create({
    name: res.body.name,
    //check schema
  })
    .then((createdJob) => {
      res.redirect('/jobs/${createdJob._id}');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/jobs/:id/delete', (req, res) => {
  Jobs.deleteOne({ _id: req.params.id })
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
      res.render('jobsEdit.hbs', jobDocuments);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
