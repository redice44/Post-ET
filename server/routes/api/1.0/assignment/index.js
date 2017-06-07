const mongoose = require('mongoose');

const bbAPI = require('../../bb/');

/* Model */
const Assignment = mongoose.model('Assignment');

function findOne (q) {
  return Assignment.findOne(q);
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

exports.findOne = findOne;
// exports.create = create;
exports.getOrCreate = getOrCreate;
