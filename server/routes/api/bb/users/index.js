const request = require('superagent');

const authAPI = require('../auth');
const domain = 'http://localhost:9876';
const userEndpoint = '/learn/api/public/v1/users/'

function getUser (userId) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        console.log(`-> BB [GET]: ${domain}${userEndpoint}${userId}`);
        request.get(`${domain}${userEndpoint}${userId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, asyncRes) => {
            if (err || asyncRes.status !== 200) {
              return reject(err || asyncRes.status);
            }

            return resolve(JSON.parse(asyncRes.text));
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

exports.getUser = getUser;
