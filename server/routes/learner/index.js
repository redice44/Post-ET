const request = require('superagent');

const express = require('express');
const router = express.Router();
const path = require('path');

const instagramAPI = require('../api/instagram');

// router.get('/', (req, res) => {
//   console.log(`Session ID: ${req.session.userId}`);
//   return res.render('learner/showAuth');
// });

router.get('/', instagramAPI.auth.authUser);

router.get('/user/:userId/as/:asId', (req, res) => {
  instagramAPI.self.feed(req.session.access_token)
    .then((result) => {
      let locals = {
        media: [],
        userId: req.params.userId,
        asId: req.params.asId,
        username: req.session.instagram.username
      };

      // console.log('result', result);

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

      return res.render('learner/showFeed', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get('/auth_user', instagramAPI.auth.authUser);

router.get('/handleauth', (req, res) => {
  // console.log('session', req.session);
  console.log('error', req.query.error);
  if (req.query.error) {
    console.log('error', req.query.error);
    console.log('reason', req.query.error_reason);
    console.log('description', req.query.error_description);
    return res.status(500).send(req.query.error);
  }

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

module.exports = router;
