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
  let assignmentHash = req.params.asId;
  console.log(assignmentHash);

  assignmentAPI.get(assignmentHash)
    .then((assignment) => {
      let locals = {
        assignment: assignment
      };
      console.log('get assignment');
      console.log(assignment);
      return res.render('instructor/show', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get('/:asId/create', (req, res) => {
  let locals = {
    assignmentId: securityUtil.hashAssignment(req.session),
    assignmentName: req.session.assignmentName
  };

  res.render('instructor/create', locals);
});


module.exports = router;
