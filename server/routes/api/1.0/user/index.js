const mongoose = require('mongoose');

/* Model */
const User = mongoose.model('User');

function findOne (q) {
  return User.findOne(q).exec();
}

function find (q) {
  return User.find(q).exec();
}

function create (userData) {
  const user = new User(userData);
  return user.save();
}

function getOrCreate (q, userData) {
  const options = {
    new: true,
    upsert: true
  };

  return User.findOneAndUpdate(q, { $set: userData }, options).exec();
}

function updateUsers (queries, users) {
  console.log('Updating users');
  console.log(queries);
  console.log(users);

  let promises = users.map((user, i) => {
    return getOrCreate(queries[i], user);
  });

  return Promise.all(promises);
}

function submit (userId, asId, submission, grade) {
  return new Promise((resolve, reject) => {
    findOne({ ID: userId })
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
          let index = user.submissions.reduce((acc, submission, i) => {
            if (acc < 0) {
              if (submission.assignment === asId) {
                return i;
              }
            }

            return acc;
          }, -1);

          if (index < 0) {
            user.submissions.push(sub);
          } else {
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
    findOne({ ID: userId })
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
            // user.submissions[index].post = submission;
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

exports.findOne = findOne;
exports.find = find;
exports.create = create;
exports.getOrCreate = getOrCreate;
exports.grade = grade;
exports.updateUsers = updateUsers;
exports.submit = submit;
