const mongoose = require('mongoose');

const bbAPI = require('../../bb/');
const securityUtil = require('../../../../util/security');
const userAPI = require('../user');

/* Model */
const Assignment = mongoose.model('Assignment');

// Create new assignment
// Populates the assignment with the learners in the course
// Creates user documents for the learners
function create (assignmentData, envId) {
  return new Promise((resolve, reject) => {
    bbAPI.course.users.getStudents(assignmentData.courseId)
      .then((students) => {
        // Get all students on course list
        Promise.all(students.map((student) => {
          return bbAPI.users.getUser(student.userId);
        }))
          .then((students) => {
            let studentHashes = students.map((student) => {
              return securityUtil.hashUser({
                envId: envId,
                courseId: assignmentData.courseId,
                userId: student.id
              });
            });

            // Add learner list to assignment
            assignmentData.learners = studentHashes;

            // Update student list 
            Promise.all(students.map((student, i) => {
              return userAPI.getOrCreate({ ID: studentHashes[i] }, {
                ID: studentHashes[i],
                role: 'Student',    // Guaranteed to be only students
                envUserId: student.id,
                name: `${student.name.given} ${student.name.family}`
              });
            }))
              .then((students) => {
                // Get Gradebook Columns
                bbAPI.course.grades.getColumns(assignmentData.courseId)
                  .then((columns) => {
                    columns = columns.results;
                    columns.forEach((column) => {
                      if (column.contentId && column.contentId === assignmentData.contentId) {
                        assignmentData.columnId = column.id;
                      }
                    });
                    getOrCreate({ ID: assignmentData.ID }, assignmentData)
                      .then((as) => {
                        return resolve(as);
                      })
                      .catch((err) => {
                        console.log(err);
                        return reject(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    return reject(err);
                  });
              })
              .catch((err) => {
                console.log(err);
                return reject(err);
              });
          })
          .catch((err) => {
            console.log(err);
            return reject(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
}

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
    findOne({ ID: assignmentHash })
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

exports.create = create;
exports.findOne = findOne;
exports.get = get;
exports.getGrades = getGrades;
exports.getOrCreate = getOrCreate;
exports.update = update;
exports.updateGrade = updateGrade;
