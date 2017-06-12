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
  req.session.userId = req.body.lis_person_sourcedid;
  // Hash Environment ID, Course ID, User ID
  const userHash = securityUtil.hashUser(req.session);
  // Hash Environment ID, Course ID, Content ID
  const assignmentHash = securityUtil.hashAssignment(req.session);
  // req.session.assignmentId = assignmentHash;
  // req.session.userId = userHash;
  req.session.role = role;
  let redirectUrl = '';

  switch (role) {
    case 'Instructor':
      redirectUrl = '/instructor';
      let userData = {
        ID: userHash,
        role: role,
        envUserId: req.body.lis_person_sourcedid,
        name: req.body.lis_person_name_full
      };

      userAPI.getOrCreate({ ID: userHash }, userData)
        .then((user) => {
          assignmentAPI.findOne({ ID: assignmentHash})
            .then((assignment) => {
              if (!assignment) {
                return res.redirect(`${redirectUrl}/as/${assignmentHash}/create`);
              }

              return res.redirect(`${redirectUrl}/as/${assignmentHash}`);
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
      break;
    case 'Learner':
      redirectUrl = '/learner';
      return res.redirect(`${redirectUrl}`);
      break;
    default:
      return res.send(`Unsupported role: ${role}`);
  }
});

module.exports = router;
