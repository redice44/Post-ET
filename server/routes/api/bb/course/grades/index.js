const request = require('superagent');

const authAPI = require('../../auth');

const domain = 'http://localhost:9876';
const gradesEndpoint = '/learn/api/public/v1/courses/';

function getColumns (courseId) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        request.get(`${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns`)
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

function getColumnGrades (courseId, columnId) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        request.get(`${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns/${columnId}/users`)
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

function setGrade (courseId, columnId, userId, grade) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        request.patch(`${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns/${columnId}/users/${userId}`)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .send(grade)
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

exports.getColumns = getColumns;
exports.getColumnGrades = getColumnGrades;
exports.setGrade = setGrade;
