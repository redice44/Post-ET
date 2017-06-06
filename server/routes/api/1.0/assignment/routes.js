const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const assignmentAPI = require('./index');
const bbAPI = require('../../bb');
const securityUtil = require('../../../../util/security');
const userAPI = require('../user');

router.get('/:assignmentId', (req, res) => {
  assignmentAPI.findOne({ ID: req.params.assignmentId })
    .then((assignment) => {
      // return some display page I guess
      return res.send(assignment);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
  // Get student list for course from BB
  bbAPI.course.users.getStudents(req.session.courseId)
    .then((students) => {
      // Get all students on course list
      Promise.all(students.map((student) => {
        return bbAPI.users.getUser(student.userId);
      }))
        .then((students) => {
          let studentHashes = students.map((student) => {
            return securityUtil.hashUser({
              envId: req.session.envId,
              courseId: req.session.courseId,
              userId: student.id
            });
          });

          // Update student list 
          Promise.all(students.map((student, i) => {
            return userAPI.getOrCreate({ ID: studentHashes[i] }, {
              ID: studentHashes[i],
              role: 'Student',
              envUserId: student.id,
              name: `${student.name.given} ${student.name.family}`
            });
          }))
            .then((students) => {
              const assignmentData = {
                ID: req.body.id,
                name: req.body.name,
                courseId: req.session.courseId,
                learners: studentHashes
              };
              assignmentAPI.getOrCreate({ ID: req.body.id }, assignmentData)
                .then((as) => {
                  // probably should be .json return of assignment
                  return res.redirect(`/instructor/${req.session.courseId}${req.session.contentId}/`);
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
