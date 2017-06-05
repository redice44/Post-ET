const express = require('express');
const router = express.Router();
const path = require('path');

const validateLTI = require('./validateLTI');

router.post('/launch', (req, res) => {
  if (!validateLTI(req.body)) {
    res.status(400).send('Bad Request');
  }

  res.sendFile(path.resolve(__dirname, '../../test.html'));
});

module.exports = router;
