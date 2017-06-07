const express = require('express');
const router = express.Router();
const path = require('path');

const assignmentAPI = require('../api/1.0/assignment');
const userAPI = require('../api/1.0/user');
const bbAPI = require('../api/bb');
const roleAuth = require('../api/1.0/auth/role');
const securityUtil = require('../../util/security');

router.all('*', roleAuth.isInstructor);

router.get('/', (req, res) => {
  res.render('instructor/dash');
});

router.get('/:asId', (req, res) => {
  let locals = {
    assignmentName: req.session.assignmentName
  };

  let assignmentHash = securityUtil.hashAssignment({
    envId: req.session.envId,
    courseId: req.params.asId,
    contentId: ''
  });

  bbAPI.course.grades.getColumns(req.session.courseId)
    .then((columns) => {
      return res.send(columns);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });

  // assignmentAPI.findOne({ ID: assignmentHash})
  //   .then((assignment) => {
  //     userAPI.find({
  //       ID: { $in: assignment.learners }
  //     })
  //       .then((learners) => {
  //         locals.learners = learners;
  //         return res.render('instructor/show', locals);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return res.status(500).send(err);
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   });

});

router.get('/:asId/create', (req, res) => {
  let locals = {
    assignmentId: securityUtil.hashAssignment(req.session),
    assignmentName: req.session.assignmentName
  };

  res.render('instructor/create', locals);
});


module.exports = router;
