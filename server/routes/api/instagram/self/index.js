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
