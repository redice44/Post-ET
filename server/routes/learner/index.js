const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  console.log(`Session ID: ${req.session.userId}`);
  // res.sendFile(path.join(__dirname, 'learner.html'));
  // add variables to pass through if need be
  const locals = {

  };
  res.render('learner/show', locals);
});

module.exports = router;
