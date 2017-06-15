const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userAPI = require('./index');

// router.get('/:userId', (req, res) => {
//   userAPI.get(req.params.userId)
//     .then((user) => {
//       // return some display page I guess
//       return res.send(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).send(err);
//     });
// });

// Submit post to assignment
router.post('/:userId/as/:asId', (req, res) => {
  let submission = {
    ID: req.body.mediaId,
    postLink: req.body.postLink,
    type: req.body.type,
    width: parseInt(req.body.width),
    height: parseInt(req.body.height),
    url: req.body.url,
    description: req.body.description
  };

  userAPI.submit(req.params.userId, req.params.asId, submission)
    .then((user) => {
      return res.redirect(`/learner`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

// router.post('/', (req, res) => {
//   const userData = {
//     ID: req.body.userId,
//     role: req.body.role
//   };
  
//   userAPI.create(userData)
//     .then((user) => {
//       return res.json({ user: user });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).send(err);
//     });
// });

module.exports = router;
