const request = require('superagent');

const private =  require('../../../../../private');

const instagramDomain = 'https://api.instagram.com/';
const redirectUriBase = 'http://localhost:14159/learner/handleauth/';
let redirectUri;

function authUser (req, res) {
  redirectUri = redirectUriBase + `?asId=${req.session.asId}&userId=${req.session.userId}`
  const instagramAuthUrl = `${instagramDomain}oauth/authorize/?client_id=${private.instaId}&redirect_uri=${redirectUri}&response_type=code&output=embed`;
  // console.log('session', req.session);
  return res.redirect(instagramAuthUrl);
}

function getAuthToken (code) {
  const accessTokenUrl = `${instagramDomain}oauth/access_token`;
  console.log('redirect uri', redirectUri);
  console.log('code', code);

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
        let result = JSON.parse(asynRes.text);
        let params = redirectUri.split('?')[1].split('&');
        result.asId = params[0].split('=')[1];
        result.userId = params[1].split('=')[1];
        return resolve(result);
      });
  });
}

exports.authUser = authUser;
exports.getAuthToken = getAuthToken;
