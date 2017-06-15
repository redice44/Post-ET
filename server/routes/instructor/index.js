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

const assignmentAPI = require('../api/1.0/assignment');
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
        assignment: assignment,
        embedCode: `<p style="text-align: center;"><iframe width="720" height="400" src="http://localhost:14159/api/1.0/assignment/${assignment.ID}"></iframe></p>`
      };

      // Sort order is. submitted < graded < unsubmitted
      assignment.learners.sort((a, b) => {
        switch(a.state) {
          case 'submitted':
            if (b.state === 'submitted') {
              return 0;
            }
            return -1;
          case 'graded':
            if (b.state === 'graded') {
              return 0;
            } else if (b.state === 'submitted') {
              return 1;
            }
            return -1;
          case 'unsubmitted':
            if (b.state === 'unsubmitted') {
              return 0;
            }
            return 1;
          default:
            console.log(`Unexpected state: ${a.state}.`);
            // Do not alter sort order
            return 0;
        }
      });
      
      return res.render('instructor/grade', locals);
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
