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

exports.findOne = findOne;
exports.find = find;
exports.create = create;
exports.getOrCreate = getOrCreate;
exports.updateUsers = updateUsers;
