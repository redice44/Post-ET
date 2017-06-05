const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');

const validateLTI = require('./validateLTI');
const getUserRole = require('./userRole');

const userAPI = require('../api/1.0/user');

router.post('/launch', (req, res) => {
  if (!validateLTI(req.body)) {
    res.status(400).send('Bad Request');
  }

  let role = getUserRole(req.body);
  // Hash Environment ID, Course ID, Content ID, User ID
  const userHash = hashSHA256(`${req.body.tool_consumer_instance_guid}${req.body.context_id}${req.body.resource_link_id}${req.body.user_id}`);
  // Hash Environment ID, Course ID, Content ID
  const assignmentHash = hashSHA256(`${req.body.tool_consumer_instance_guid}${req.body.context_id}${req.body.resource_link_id}`);
  let redirectUrl = '';
  
  switch (role) {
    case 'Instructor':
      redirectUrl = '/instructor';
      break;
    case 'Learner':
      redirectUrl = '/learner';
      break;
    default:
      res.send(`Unsupported role: ${role}`);
  }

  userAPI.getOrCreate(userHash, role)
    .then((user) => {
      req.session.assignmentId = assignmentHash;
      req.session.userId = user.ID;
      return res.redirect(redirectUrl);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

function hashSHA256 (str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  const sha256 = hash.digest('base64');
  console.log(sha256);
  return sha256;
}

module.exports = router;
