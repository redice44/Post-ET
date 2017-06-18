/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const request = require('superagent');

const authAPI = require('../../auth');

const domain = 'http://localhost:9876';
const gradesEndpoint = '/learn/api/public/v1/courses/';

function createColumn (courseId, columnData) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        console.log(`-> BB [POST]: ${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns`);
        request.post(`${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns`)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .send(columnData)
          .end((err, asyncRes) => {
            if (err || asyncRes.status !== 201) {
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

function deleteColumn (courseId, columnId) {
  columnId = 'string16';
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        console.log(`-> BB [DELETE]: ${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns/externalId:${columnId}`);
        request.delete(`${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns/externalId:${columnId}`)
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

function getColumns (courseId) {
  return new Promise((resolve, reject) => {
    authAPI.getToken()
      .then((token) => {
        console.log(`-> BB [GET]: ${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns`);
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
        console.log(`-> BB [GET]: ${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns/${columnId}/users`);
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
        console.log(`-> BB [PATCH]: ${domain}${gradesEndpoint}externalId:${courseId}/gradebook/columns/${columnId}/users/${userId}`);
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

exports.createColumn = createColumn;
exports.deleteColumn = deleteColumn;
exports.getColumns = getColumns;
exports.getColumnGrades = getColumnGrades;
exports.setGrade = setGrade;
