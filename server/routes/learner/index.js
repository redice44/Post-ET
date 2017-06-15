/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const request = require('superagent');

const express = require('express');
const router = express.Router();
const path = require('path');

const assignmentAPI = require('../api/1.0/assignment');
const roleAuth = require('../api/1.0/auth/role');
const instagramAPI = require('../api/instagram');

router.all('*', roleAuth.isLearner);

router.get('/', (req, res) => {
  assignmentAPI.get(req.session.asId)
    .then((assignment) => {
      if (!assignment) {
        console.log('No assignment');
        // idk. The assignment should be created. How to handle?
        return res.send('no assignment?????');
      }

      assignment.learners.forEach((learner) => {
        if (learner.ID === req.session.userId) {
          assignment.learner = learner;
        }
      });
      delete assignment.learners;
      console.log('assignment', assignment);

      let locals = {
        assignment: assignment
      };

      return res.render('learner/assignment', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });

});

router.get('/auth', (req, res) => {
  return res.render('learner/showAuth');
});

router.get('/user/:userId/as/:asId', (req, res) => {
  assignmentAPI.get(req.session.asId)
    .then((assignment) => {
    instagramAPI.self.feed(req.session.access_token)
      .then((result) => {
        let locals = {
          media: [],
          userId: req.params.userId,
          asId: req.params.asId,
          username: req.session.instagram.username,
          assignment: assignment
        };

        result.data.forEach((d) => {
          let media = {};
          if (d.type === 'image') {
            media = d.images.standard_resolution;
            media.type = 'image';
          } else if (d.type === 'video') {
            media = d.videos.standard_resolution;
            media.type = 'video';
          } else {
            console.log('Media is not an image or video. Unhandled', d);
          }
          media.postLink = d.link;
          media.width = Math.floor(media.width * 1);
          media.height = Math.floor(media.height * 1);
          media.description = d.caption.text;
          media.id = d.id;
          locals.media.push(media);
        });

        assignment.learners.forEach((learner) => {
          if (learner.ID === req.session.userId) {
            assignment.learner = learner;
          }
        });

        delete assignment.learners;

        return res.render('learner/feed', locals);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(err);
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get('/auth_user', instagramAPI.auth.authUser);

router.get('/authToken', (req, res) => {
  instagramAPI.auth.getAuthToken(req.query.code)
    .then((result) => {
      console.log('result', result);
      req.session.access_token = result.access_token;
      req.session.instagram = result.user;
      req.session.userId = result.userId;
      req.session.asId = result.asId;

      return res.redirect(`/learner/user/${result.userId}/as/${result.asId}`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get('/handleauth', (req, res) => {
  if (req.query.error) {
    console.log('error', req.query.error);
    console.log('reason', req.query.error_reason);
    console.log('description', req.query.error_description);
    return res.status(500).send(req.query.error);
  }

  let locals = {
    code: req.query.code
  };

  return res.render('learner/authRedirect', locals);
});

module.exports = router;
