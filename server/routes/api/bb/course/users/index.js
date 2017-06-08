const request = require('superagent');
// const private = require('../../../../../../private');
const authAPI = require('../../auth');

const domain = 'http://localhost:9876';
const courseEndpoint = '/learn/api/public/v1/courses/';

function get (courseId) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        console.log(`-> BB [GET]: ${domain}${courseEndpoint}externalId:${courseId}/users`);
        request.get(`${domain}${courseEndpoint}externalId:${courseId}/users`)
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

function getStudents (courseId) {
  return new Promise((resolve, reject) => {
    get(courseId)
      .then((students) => {
        return resolve(filterStudents(students.results));
      })
      .catch((err) => {
        return reject(err);
      })
  })
}

function filterStudents (users) {
  return users.filter((user) => {
    return user.courseRoleId === 'Student';
  });
}

exports.get = get;
exports.getStudents = getStudents;
