const request = require('superagent');

const authAPI = require('../../auth');

const domain = 'http://localhost:9876';
const gradesEndpoint = '/learn/api/public/v1/courses/';

function update (courseId, contentId, contentData) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        console.log(`-> BB [PATCH]: ${domain}${gradesEndpoint}externalId:${courseId}/contents/${contentId}`);
        request.patch(`${domain}${gradesEndpoint}externalId:${courseId}/contents/${contentId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(contentData)
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

exports.update = update;
