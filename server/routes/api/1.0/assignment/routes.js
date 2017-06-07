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
  let assignmentData = {
    ID: req.body.id,
    name: req.body.name,
    courseId: req.session.courseId,
    contentId: req.session.contentId,
  };

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

          // Add learner list to assignment
          assignmentData.learners = studentHashes;

          // Update student list 
          Promise.all(students.map((student, i) => {
            return userAPI.getOrCreate({ ID: studentHashes[i] }, {
              ID: studentHashes[i],
              role: 'Student',    // Guaranteed to be only students
              envUserId: student.id,
              name: `${student.name.given} ${student.name.family}`
            });
          }))
            .then((students) => {
              // Get Gradebook Column
              bbAPI.course.grades.getColumns(req.session.courseId)
                .then((columns) => {
                  columns = columns.results;
                  console.log('columns');
                  console.log(columns);
                  columns.forEach((column) => {
                    if (column.contentId && column.contentId === assignmentData.contentId) {
                      assignmentData.columnId = column.id;
                    }
                  });
                  assignmentAPI.getOrCreate({ ID: assignmentData.ID }, assignmentData)
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
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
