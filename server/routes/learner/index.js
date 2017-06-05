const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  // res.send('Learner path');
  // console.log(req.body);
  console.log(`Session ID: ${req.session.userId}`);
  res.sendFile(path.join(__dirname, 'learner.html'));
});

module.exports = router;
