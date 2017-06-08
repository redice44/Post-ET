const mongoose = require('mongoose');

const bbAPI = require('../../bb/');
const userAPI = require('../user');

/* Model */
const Assignment = mongoose.model('Assignment');

function findOne (q) {
  return Assignment.findOne(q).exec();
}

function get (assignmentHash) {
  return new Promise((resolve, reject) => {
    findOne({ ID: assignmentHash })
      .then((assignment) => {
        userAPI.find({ ID: { $in: assignment.learners }})
          .then((learners) => {
            assignment = assignment.toObject();

            assignment.learners = [];
            learners.forEach((learner) => {
              assignment.learners.push(learner.toJSON());
            });
            if (assignment.columnId) {
              getGrades(assignment.courseId, assignment.columnId)
                .then((grades) => {
                  grades.results.forEach((grade) => {
                    assignment.learners.forEach((learner) => {
                      if (learner.envUserId === grade.userId) {
                        learner.grade = grade.score;
                      }
                    });
                  });
                  return resolve(assignment);
                })
                .catch((err) => {
                  return reject(err);
                });
            }
            return resolve(assignment);
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

function getOrCreate (q, assignmentData) {
  const options = {
    new: true,
    upsert: true
  };

  return Assignment.findOneAndUpdate(q, { $set: assignmentData }, options).exec();
}

// Only allow name, description, and learners to be updated.
function update (assignmentHash, assignmentData) {
  return new Promise((resolve, reject) => {
    get({ ID: assignmentHash })
      .then((assignment) => {
        assignment.name = assignmentData.name || assignment.name;
        assignment.description = assignmentData.description || assignment.description;
        assignment.learners = assignmentData.learners || assignment.learners;

        assignment.save()
          .then((as) => {
            return resolve(as);
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

function getGrades (courseId, columnId) {
  return new Promise((resolve, reject) => {
    bbAPI.course.grades.getColumnGrades(courseId, columnId)
      .then((grades) => {
        return resolve(grades);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function updateGrade (courseId, columnId, userId, grade) {
  return new Promise((resolve, reject) => {
    bbAPI.course.grades.setGrade(courseId, columnId, userId, grade)
      .then((updatedGrade) => {
        return resolve(updatedGrade);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

exports.findOne = findOne;
exports.get = get;
exports.getGrades = getGrades;
exports.getOrCreate = getOrCreate;
exports.updateGrade = updateGrade;
