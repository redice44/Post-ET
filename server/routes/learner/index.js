const request = require('superagent');

const express = require('express');
const router = express.Router();
const path = require('path');

const instagramAPI = require('../api/instagram');

router.get('/', (req, res) => {
  console.log(`Session ID: ${req.session.userId}`);
  return res.render('learner/showAuth');
});

router.get('/feed', (req, res) => {
  instagramAPI.self.feed(req.session.access_token)
    .then((result) => {
      let locals = {
        media: []
      };

      console.log('result', result);

      result.data.forEach((d) => {
        let media = {};
        if (d.type === 'image') {
          media = d.images.standard_resolution;
          media.type = 'image';
          locals.media.push(media);
        } else if (d.type === 'video') {
          media = d.videos.standard_resolution;
          media.type = 'video';
          locals.media.push(media);
        } else {
          console.log('Media is not an image or video. Unhandled', d);
        }
      });

      return res.render('learner/showFeed', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get('/auth_user', instagramAPI.auth.authUser);

router.get('/handleauth', (req, res) => {
  console.log('error', req.query.error);
  if (req.query.error) {
    console.log('error', req.query.error);
    console.log('reason', req.query.error_reason);
    console.log('description', req.query.error_description);
    return res.status(500).send(req.query.error);
  }

  instagramAPI.auth.getAuthToken(req.query.code)
    .then((result) => {
      req.session.access_token = result.access_token;
      req.session.instagram = result.user;

      return res.redirect('/learner/feed');
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
