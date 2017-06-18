/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const request = require('superagent');

const private =  require('../../../../../private');

const instagramDomain = 'https://api.instagram.com/';
const redirectUriBase = 'http://localhost:14159/learner/handleauth/';
let redirectUri;

function authUser (req, res) {
  redirectUri = redirectUriBase + `?asId=${req.session.asId}&userId=${req.session.userId}`
  const instagramAuthUrl = `${instagramDomain}oauth/authorize/?client_id=${private.instaId}&redirect_uri=${redirectUri}&response_type=code&output=embed`;
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
