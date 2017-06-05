const express = require('express');
const router = express.Router();
const path = require('path');

const validateLTI = require('./validateLTI');
const getUserRole = require('./userRole');

router.post('/launch', (req, res) => {
  if (!validateLTI(req.body)) {
    res.status(400).send('Bad Request');
  }

  let role = getUserRole(req.body);

  switch (role) {
    case 'Instructor':
      res.redirect('/instructor');
      break;
    case 'Learner':
      res.redirect('/learner');
      break;
    default:
      res.send(`Unsupported role: ${role}`);
  }
  // res.sendFile(path.resolve(__dirname, '../../test.html'));
});

module.exports = router;
