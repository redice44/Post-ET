const express = require('express');
const router = express.Router();
const path = require('path');

const securityUtil = require('../../util/security');
const validateLTI = require('./validateLTI');
const getUserRole = require('./userRole');


const assignmentAPI = require('../api/1.0/assignment');
const userAPI = require('../api/1.0/user');

router.post('/launch', (req, res) => {
  if (!validateLTI(req.body)) {
    res.status(400).send('Bad Request');
  }

  // console.log(req.body);

  let role = getUserRole(req.body);
  req.session.envId = req.body.tool_consumer_instance_guid;
  req.session.courseId = req.body.context_label;
  req.session.contentId = req.body.resource_link_id;
  req.session.assignmentName = req.body.resource_link_title;
  // Hash Environment ID, Course ID, User ID
  const userHash = securityUtil.hashUser(req.session);
  // Hash Environment ID, Course ID, Content ID
  const assignmentHash = securityUtil.hashAssignment(req.session);
  req.session.assignmentId = assignmentHash;
  req.session.userId = userHash;
  req.session.role = role;
  let redirectUrl = '';

  switch (role) {
    case 'Instructor':
      redirectUrl = '/instructor';
      break;
    case 'Learner':
      redirectUrl = '/learner';
      break;
    default:
      res.send(`Unsupported role: ${role}`);
  }

  let userData = {
    ID: userHash,
    role: role,
  };

  userAPI.getOrCreate(userHash, userData)
    .then((user) => {
      assignmentAPI.get(assignmentHash)
        .then((assignment) => {
          if (!assignment) {
            return res.redirect(`${redirectUrl}/${req.session.courseId}${req.session.contentId}/create`);
          }

          return res.redirect(`${redirectUrl}/${req.session.courseId}${req.session.contentId}`);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
