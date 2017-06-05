const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');

const validateLTI = require('./validateLTI');
const getUserRole = require('./userRole');

const userAPI = require('../api/1.0/learner');

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
      const userHash = genUserId(req.body.tool_consumer_instance_guid, req.body.context_id, req.body.user_id);
      userAPI.get(userHash)
        .then((user) => {
          if (!user) {
            console.log('Creating new user');
            const userData = {
              ID: userHash,
              role: role
            };
            userAPI.create(userData)
              .then((doc) => {
                console.log(doc);
                req.session.userId = doc.ID;
                return res.redirect('/learner');
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({ err: err });
              });
          } else {
            console.log(user);
            req.session.userId = user.ID;
            return res.redirect('/learner');
          }

        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ err: err });
        });
      break;
    default:
      res.send(`Unsupported role: ${role}`);
  }
  // res.sendFile(path.resolve(__dirname, '../../test.html'));
});

function genUserId (envId, contextId, userId) {
  const hash = crypto.createHash('sha256');
  hash.update(`${envId}${contextId}${userId}`);
  const sha256 = hash.digest('base64');
  console.log(sha256);
  return sha256;
}

module.exports = router;
