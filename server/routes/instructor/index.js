const express = require('express');
const router = express.Router();
const path = require('path');

const assignmentAPI = require('../api/1.0/assignment');

router.get('/', (req, res) => {
  const locals = {
    assignmentName: req.session.assignmentName,
    assignmentId: req.session.assignmentId
  };

  assignmentAPI.get(req.session.assignmentId)
    .then((assignment) => {
      if (!assignment) {
        return res.render('instructor/create', locals);
      }
      
      return res.render('instructor/show', locals);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;
