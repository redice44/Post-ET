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

function submit (userId, asId, submission) {
  return new Promise((resolve, reject) => {
    findOne({ ID: userId })
      .then((user) => {
        if (!user.submissions) {
          user.submissions = [{
            assignment: asId,
            post: submission
          }];
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
            user.submissions.push({
              assignment: asId,
              post: submission
            });
          } else {
            user.submissions[index].post = submission;
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
exports.updateUsers = updateUsers;
exports.submit = submit;
