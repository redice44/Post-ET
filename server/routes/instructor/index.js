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

router.get('/as/:asId', (req, res) => {
  let assignmentHash = req.params.asId;

  assignmentAPI.get(assignmentHash)
    .then((assignment) => {
      let locals = {
        assignment: assignment
      };

      console.log('assignment', assignment);

      // console.log('learners', assignment.learners);
      // assignment.learners.forEach(function (learner) {
      //   console.log(learner.name);
      //   console.log('assignment id', assignment.ID);
      //   learner.submissions.forEach(function (submission) {
      //     console.log('submission id', submission.assignment);
      //     if (submission.assignment === assignment.ID) {
      //       console.log(submission.post);
      //     }
      //   });
      // });
      
      return res.render('instructor/show', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get('/as/:asId/create', (req, res) => {
  let locals = {
    assignment: {
      ID: req.params.asId,
      name: req.session.assignmentName
    },
    action: 'Create',
    httpVerb: 'POST',
    endpoint: '/api/1.0/assignment'
  };

  // Remove assignment name from session
  delete req.session.assignmentName;

  res.render('instructor/modify', locals);
});

router.get('/as/:asId/edit', (req, res) => {
  assignmentAPI.get(req.params.asId)
    .then((assignment) => {
      let locals = {
        assignment: assignment,
        action: 'Edit',
        httpVerb: 'POST',
        endpoint: `/api/1.0/assignment/${assignment.ID}`
      };

      return res.render('instructor/modify', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
