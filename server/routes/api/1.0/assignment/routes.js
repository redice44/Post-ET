const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const assignmentAPI = require('./index');
const bbAPI = require('../../bb');
const userAPI = require('../user');

router.get('/:assignmentId', (req, res) => {
  assignmentAPI.findOne({ ID: req.params.assignmentId })
    .then((assignment) => {
      // return some display page I guess
      bbAPI.course.grades.getColumnGrades(assignment.courseId, assignment.columnId)
        .then((grades) => {
          console.log(grades);
          return res.send(grades);
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

// Creates new assignment
router.post('/', (req, res) => {
  let assignmentData = {
    ID: req.body.asId,
    name: req.body.name,
    description: req.body.description,
    courseId: req.session.courseId,
    contentId: req.session.contentId,
  };

  assignmentAPI.create(assignmentData, req.session.envId)
    .then((assignment) => {
      // update blackboard content item
      return res.redirect(`/instructor/as/${assignment.ID}/`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.post('/:asId/learner/:lId', (req, res) => {
  assignmentAPI.findOne({ ID: req.params.asId })
    .then((assignment) => {
      let grade = {
        score: req.body.grade
      };
      assignmentAPI.updateGrade(assignment.courseId, assignment.columnId, req.params.lId, grade)
        .then((updatedGrade) => {
          // temp just send them back to the assignment page to see the update
          return res.redirect(`/instructor/${req.params.asId}`);
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
