const mongoose = require('mongoose');

const bbAPI = require('../../bb/');

/* Model */
const Assignment = mongoose.model('Assignment');

function findOne (q) {
  return Assignment.findOne(q);
}

function create (assignmentData) {
  return new Promise((resolve, reject) => {
    bbAPI.course.users.getStudents(assignmentData.courseId)
      .then((learners) => {
        let data = assignmentData;
        data.learners = learners
        const assignment = new Assignment(data);
        assignment.save()
          .then((as) => {
            return resolve(as);
          })
          .catch((err) => {
            return reject(err);
          })
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function getOrCreate (q, assignmentData) {
  const options = {
    new: true,
    upsert: true
  };

  return Assignment.findOneAndUpdate(q, { $set: assignmentData }, options).exec();
}

exports.findOne = findOne;
exports.create = create;
exports.getOrCreate = getOrCreate;
