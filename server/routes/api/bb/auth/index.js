const request = require('superagent');
const private = require('../../../../../private');

const domain = 'http://localhost:9876';
const tokenEndpoint = '/learn/api/public/v1/oauth2/token';

function getToken () {
  return new Promise((resolve, reject) => {
    request.post(`${domain}${tokenEndpoint}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .auth(private.key, private.secret)
      .withCredentials()
      .send({ grant_type: 'client_credentials'})
      .end((err, asyncRes) => {
        if (err || asyncRes.status !== 200) {
          return reject(`Error code ${asyncRes.status}`);
        }

        return resolve(JSON.parse(asyncRes.text).access_token);
      });
  })
}

exports.getToken = getToken;
