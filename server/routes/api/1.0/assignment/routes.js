const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const assignmentAPI = require('./index');
const bbAPI = require('../../bb');
const userAPI = require('../user');

router.get('/:asId', (req, res) => {
  assignmentAPI.findOne({ ID: req.params.asId })
    .then((assignment) => {
      // return some display page I guess
      bbAPI.course.grades.getColumnGrades(assignment.courseId, assignment.graded.columnId)
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
  console.log(req.body);
  let assignmentData = {
    ID: req.body.asId,
    name: req.body.name,
    description: req.body.description,
    courseId: req.session.courseId,
    contentId: req.session.contentId,
  };

  if (req.body.graded) {
    assignmentData.graded = true;
    if (req.body.maxPoints) {
      assignmentData.maxPoints = req.body.maxPoints;
    } else {
      assignmentData.maxPoints = 0;
    }
  }

  console.log('assignment data');
  console.log(assignmentData);



  // bbAPI.course.grades.deleteColumn(assignmentData.courseId)
  //   .then((asyncRes) => {



      assignmentAPI.create(assignmentData, req.session.envId)
        .then((assignment) => {
          // redirect for now
          // update blackboard content item
          return res.redirect(`/instructor/as/${assignment.ID}/`);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send(err);
        });




    // })
    // .catch((err) => {
    //   console.log(err);
    //   return res.status(500).send(err);
    // });

});

// Updates an assignment
// update to put. Using post for now since I'm testing with forms.
router.post('/:asId', (req, res) => {
  let assignmentData = {
    name: req.body.name,
    description: req.body.description
  };

  assignmentAPI.update(req.params.asId, assignmentData)
    .then((assignment) => {
      // redirect for now
      // update blackboard content item
      return res.redirect(`/instructor/as/${assignment.ID}/`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

// Updates a learner's grade for the assignment
// Probably should use put. 
router.post('/:asId/learner/:lId', (req, res) => {
  let grade = {
    score: req.body.grade
  };

  if (req.body.feedback) {
    grade.feedback = req.body.feedback;
  }

  assignmentAPI.updateGrade(req.params.asId, req.params.lId, grade)
    .then(() => {
      return res.redirect(`/instructor/as/${req.params.asId}`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
