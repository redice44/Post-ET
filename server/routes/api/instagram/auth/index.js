const request = require('superagent');

const private =  require('../../../../../private');

const instagramDomain = 'https://api.instagram.com/';
const redirectUri = 'http://localhost/learner/handleauth';

function authUser (req, res) {
  const instagramAuthUrl = `${instagramDomain}oauth/authorize/?client_id=${private.instaId}&redirect_uri=${redirectUri}&response_type=code`;
  return res.redirect(instagramAuthUrl);
}

function getAuthToken (code) {
  const accessTokenUrl = `${instagramDomain}oauth/access_token`;

  return new Promise((resolve, reject) => {
    request.post(accessTokenUrl)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`client_id=${private.instaId}`)
      .send(`client_secret=${private.instaSecret}`)
      .send(`grant_type=authorization_code`)
      .send(`redirect_uri=${redirectUri}`)
      .send(`code=${code}`)
      .end((err, asynRes) => {
        if (err) {
          return reject(err);
        }

        return resolve(JSON.parse(asynRes.text));
      });
  });
}

exports.authUser = authUser;
exports.getAuthToken = getAuthToken;
