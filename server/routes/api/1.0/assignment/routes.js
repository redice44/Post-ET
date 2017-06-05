const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const assignmentAPI = require('./index');

router.get('/:assignmentId', (req, res) => {
  assignmentAPI.get(req.params.assignmentId)
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
  const assignmentData = {
    ID: req.body.id,
    name: req.body.name
  };

  assignmentAPI.get(assignmentData.ID)
    .then((assignment) => {
      if (!assignment) {
        console.log('Creating Assignment');
        assignmentAPI.create(assignmentData)
          .then((assignment) => {
            return res.json({ assignment: assignment });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send(err);
          });
      } else {
        console.log('Assignment already exists');
        return res.json({ assignment: assignment });
      }
    })
  
});

module.exports = router;
