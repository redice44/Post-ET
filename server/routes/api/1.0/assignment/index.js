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
    // Build student list from Blackboard
    bbAPI.course.users.getStudents(assignmentData.courseId)
      .then((students) => {
        // Get student information
        Promise.all(students.map((student) => {
          return bbAPI.users.getUser(student.userId);
        }))
          .then((students) => {
            let studentHashes = students.map((student) => {
              return securityUtil.hashUser({
                envId: envId,
                courseId: assignmentData.courseId,
                // userId: student.id
                userId: student.userName
              });
            });

            // Add learner list to assignment
            assignmentData.learners = studentHashes;

            // Create or update students
            Promise.all(students.map((student, i) => {
              return userAPI.getOrCreate({ ID: studentHashes[i] }, {
                ID: studentHashes[i],
                role: 'Student',    // Guaranteed to be only students
                envUserId: student.id,
                name: `${student.name.given} ${student.name.family}`
              });
            }))
              .then((students) => {
                if (assignmentData.graded) {
                  // Create grade column for assignment
                  // We do this because we cannot edit content items that are
                  // graded if they were created in BB that way.
                  // So we create our own column and assocations.
                  __graded__(assignmentData)
                    .then((as) => {
                      return resolve(as);
                    })
                    .catch((err) => {
                      return reject(err);
                    })
                } else {
                  __create__(assignmentData)
                    .then((as) => {
                      return resolve(as);
                    })
                    .catch((err) => {
                      return reject(err);
                    });
                }
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

            assignment.learners.forEach((learner) => {
              learner.state = 'unsubmitted';
              learner.submissions.forEach((submission) => {
                if (submission.assignment === assignment.ID) {
                  learner.post = submission.post;
                }
              });

              if (learner.post) {
                learner.state = 'submitted';
              }

              delete learner.submissions;
            });

            if (assignment.graded && assignment.graded.columnId) {
              __getGrades__(assignment.courseId, assignment.graded.columnId)
                .then((grades) => {
                  grades.results.forEach((grade) => {
                    assignment.learners.forEach((learner) => {
                      if (learner.envUserId === grade.userId) {
                        if (!learner.grade) {
                          learner.grade = {}
                        }
                        learner.grade.score = grade.score;
                        learner.grade.feedback = grade.feedback;
                        learner.state = 'graded';
                      }
                    });
                  });
                  return resolve(assignment);
                })
                .catch((err) => {
                  return reject(err);
                });
            } else {
              return resolve(assignment);
            }
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

function update (assignmentHash, assignmentData) {
  return new Promise((resolve, reject) => {
    findOne({ ID: assignmentHash })
      .then((assignment) => {
        // Only the following properties are being allowed to be updated
        assignment.name = assignmentData.name || assignment.name;
        assignment.description = assignmentData.description || assignment.description;
        assignment.learners = assignmentData.learners || assignment.learners;
        assignment.dueDate = assignmentData.dueDate || assignment.dueDate;

        if (assignmentData.graded) {
          assignment.graded.maxPoints = assignmentData.maxPoints || assignment.graded.maxPoints;
        }

        assignment.save()
          .then((as) => {
            let contentData = {
              title: as.name,
              body: as.description
            };

            bbAPI.course.content.update(as.courseId, as.contentId, contentData)
              .then(() => {
                return resolve(as);
              })
              .catch((err) => {
                console.log(err);
                return reject(err);
              });
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

function updateGrade (asId, userId, grade) {
  return new Promise((resolve, reject) => {
    findOne({ ID: asId })
      .then((assignment) => {
        bbAPI.course.grades.setGrade(assignment.courseId, assignment.graded.columnId, userId, grade)
          .then((updatedGrade) => {
            return resolve(updatedGrade);
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

function __create__ (assignmentData) {
  return new Promise((resolve, reject) => {
    __getOrCreate__({ ID: assignmentData.ID }, assignmentData)
      .then((as) => {
        // update content
        let contentData = {
          title: as.name,
          // body: `<iframe src='http://localhost/api/1.0/assignment/${as.ID}'></iframe>`
        };

        // Update content item in BB.
        bbAPI.course.content.update(as.courseId, as.contentId, contentData)
          .then(() => {
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
  });
}

function __getGrades__ (courseId, columnId) {
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

function __getOrCreate__ (q, assignmentData) {
  const options = {
    new: true,
    upsert: true
  };

  return Assignment.findOneAndUpdate(q, { $set: assignmentData }, options).exec();
}

function __graded__ (assignmentData) {
  return new Promise((resolve, reject) => {
    assignmentData.graded = {};
    assignmentData.graded.maxPoints = assignmentData.maxPoints;
    delete assignmentData.maxPoints;

    let columnData = {
      "externalId": assignmentData.name,
      "name": assignmentData.name,
      // "description": "string",
      // "externalGrade": true,
      "score": {
        "possible": assignmentData.graded.maxPoints,
        // "decimalPlaces": 0
      },
      "availability": {
        "available": "Yes"
      },
      "grading": {
        "type": "Manual",
        // "due": "2017-06-05T19:34:25.125Z",
        // "attemptsAllowed": 0,
        // "scoringModel": "Last",
        "anonymousGrading": {
          "type": "None",
          // "releaseAfter": "2017-06-05T19:34:25.125Z"
        }
      }
    };

    bbAPI.course.grades.createColumn(assignmentData.courseId, columnData)
      .then((column) => {
        assignmentData.graded.columnId = column.id;

        // Create Assignment
        __create__(assignmentData)
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

exports.create = create;
exports.findOne = findOne;
exports.get = get;
exports.update = update;
exports.updateGrade = updateGrade;
