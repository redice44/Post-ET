/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const request = require('superagent');

const instagramDomain = 'https://api.instagram.com/';

function feed (token) {
  const feedEndpoint = `v1/users/self/media/recent/`;
  const feedUri = `${instagramDomain}${feedEndpoint}?access_token=${token}`;

  return new Promise((resolve, reject) => {
    request.get(feedUri)
      .end((err, asyncRes) => {
        if (err) {
          return reject(err);
        }

        return resolve(JSON.parse(asyncRes.text));
      });
  });
}

exports.feed = feed;
