const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  console.log(`Session ID: ${req.session.userId}`);
  res.sendFile(path.join(__dirname, 'learner.html'));
});

module.exports = router;
