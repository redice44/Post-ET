/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

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
          return reject(err);
        }

        return resolve(JSON.parse(asyncRes.text).access_token);
      });
  })
}

exports.getToken = getToken;
