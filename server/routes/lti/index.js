/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const express = require('express');
const router = express.Router();
const path = require('path');

const securityUtil = require('../../util/security');
const validateLTI = require('./validateLTI');

const assignmentAPI = require('../api/1.0/assignment');
const userAPI = require('../api/1.0/user');

router.post('/launch', validateLTI, (req, res) => {
  let role = __getUserRole__(req.body);
  req.session.envId = req.body.tool_consumer_instance_guid;
  req.session.courseId = req.body.context_label;
  req.session.contentId = req.body.resource_link_id;
  req.session.assignmentName = req.body.resource_link_title;
  req.session.userId = req.body.lis_person_sourcedid;
  // Hash Environment ID, Course ID, User ID
  const userHash = securityUtil.hashUser(req.session);
  const assignmentHash = securityUtil.hashAssignment(req.session);
  req.session.role = role;

  switch (role) {
    case 'Instructor':
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
                return res.redirect(`/instructor/as/${assignmentHash}/create`);
              }
              return res.redirect(`/instructor/as/${assignmentHash}`);
            })
            .catch((err) => {
              console.log('error', err);
              return res.status(500).send(err);
            });
        })
        .catch((err) => {
          console.log('err2', err);
          return res.status(500).send(err);
        });
      break;
    case 'Learner':
      req.session.asId = assignmentHash;
      req.session.userId = userHash;
      return res.redirect(`/learner`);
      break;
    default:
      return res.send(`Unsupported role: ${role}`);
  }
});

function __getUserRole__ (params) {
  let role = params.roles.split(':');
  role = role[role.length - 1].split('/');
  role = role[role.length - 1]
  return role;
}

module.exports = router;
