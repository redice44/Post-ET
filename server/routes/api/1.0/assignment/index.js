const mongoose = require('mongoose');

const bbAPI = require('../../bb/');
const userAPI = require('../user');

/* Model */
const Assignment = mongoose.model('Assignment');

function findOne (q) {
  return Assignment.findOne(q);
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

// function create (assignmentData) {
//   return new Promise((resolve, reject) => {
//     // Get learners from course
//     bbAPI.course.users.getStudents(assignmentData.courseId)
//       .then((learners) => {
//         let data = assignmentData;
//         data.learners = learners
//         // Get gradebook columns
//         bbAPI.course.grades.getColumns(assignmentData.courseId)
//           .then((columns) => {
//             columns = columns.results;
//             console.log('columns');
//             console.log(columns);
//             columns.forEach((column) => {
//               if (column.contentId && column.contentId === assignmentData.contentId) {
//                 assignmentData.columnId = column.id;
//               }
//             });
//             return resolve(getOrCreate({ ID: assignmentData.ID }, assignmentData));
//               // const assignment = new Assignment(data);
//               // assignment.save()
//               //   .then((as) => {
//               //     return resolve(as);
//               //   })
//               //   .catch((err) => {
//               //     return reject(err);
//               // });
//           })
//           .catch((err) => {
//             return reject(err);
//           });
//       })
//       .catch((err) => {
//         return reject(err);
//       });
//   });
// }

function getOrCreate (q, assignmentData) {
  const options = {
    new: true,
    upsert: true
  };

  return Assignment.findOneAndUpdate(q, { $set: assignmentData }, options).exec();
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

exports.findOne = findOne;
// exports.create = create;
exports.get = get;
exports.getGrades = getGrades;
exports.getOrCreate = getOrCreate;
