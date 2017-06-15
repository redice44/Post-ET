/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userAPI = require('./index');

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

module.exports = router;
