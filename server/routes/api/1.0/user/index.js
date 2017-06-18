/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const mongoose = require('mongoose');

/* Model */
const User = mongoose.model('User');

function find (q) {
  return User.find(q).exec();
}

function getOrCreate (q, userData) {
  const options = {
    new: true,
    upsert: true
  };

  return User.findOneAndUpdate(q, { $set: userData }, options).exec();
}

function submit (userId, asId, submission, grade) {
  return new Promise((resolve, reject) => {
    __findOne__({ ID: userId })
      .then((user) => {
        let sub = {
          assignment: asId,
          post: submission,
        };
        if (grade) {
          sub.grade = grade;
        }

        if (!user.submissions) {
          user.submissions = [sub];
        } else {
          // Find the assignment to submit to
          let index = user.submissions.reduce((acc, submission, i) => {
            if (acc < 0) {
              if (submission.assignment === asId) {
                return i;
              }
            }

            return acc;
          }, -1);

          if (index < 0) {
            // New assignment submission
            user.submissions.push(sub);
          } else {
            // Updating submission
            user.submissions[index].post = submission;
            if (grade) {
              user.submissions[index].grade = grade;
            }
          }
        }

        user.save()
          .then((user) => {
            return resolve(user);
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function grade (userId, asId, grade) {
  return new Promise((resolve, reject) => {
    __findOne__({ ID: userId })
      .then((user) => {
        if (!user.submissions) {
          return reject('Attempting to grade a submission that does not exist.');
        } else {
          let index = user.submissions.reduce((acc, submission, i) => {
            if (acc < 0) {
              if (submission.assignment === asId) {
                return i;
              }
            }

            return acc;
          }, -1);

          if (index < 0) {
            return reject('Attempting to grade a submission that does not exist.');
          } else {
            if (grade) {
              user.submissions[index].grade = grade;
            } else {
              return reject('No grade submitted');
            }
          }
        }

        user.save()
          .then((user) => {
            return resolve(user);
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function __findOne__ (q) {
  return User.findOne(q).exec();
}

exports.getOrCreate = getOrCreate;
exports.grade = grade;
exports.submit = submit;
exports.find = find;
