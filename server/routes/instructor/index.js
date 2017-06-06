const express = require('express');
const router = express.Router();
const path = require('path');

const assignmentAPI = require('../api/1.0/assignment');
const userAPI = require('../api/1.0/user');
const bbAPI = require('../api/bb');
const roleAuth = require('../api/1.0/auth/role');
const securityUtil = require('../../util/security');

router.all('*', roleAuth.isInstructor);

// router.get('/', (req, res) => {


//   const locals = {
//     assignmentName: req.session.assignmentName,
//     assignmentId: req.session.assignmentId
//   };

//   getCourseStudents(req.session.courseId);
//     .then((students) => {

//     })
//     .catch((err) => {

//     });
// });

router.get('/:asId', (req, res) => {
  let locals = {
    assignmentName: req.session.assignmentName
  };

  res.render('instructor/show', locals);
});

router.get('/:asId/create', (req, res) => {
  let locals = {
    assignmentId: securityUtil.hashAssignment(req.session),
    assignmentName: req.session.assignmentName
  };

  res.render('instructor/create', locals);
});

function getCourseStudents (courseId) {
  return new Promise((resolve, reject) => {
    bbAPI.course.users.get(courseId)
      .then((users) => {
        return resolve(filterStudents(users));
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function filterStudents (users) {
  return users.filter((user) => {
    return user.courseRoleId === 'Student';
  });
}
//     .then((users) => {
//       console.log(users);
//       locals.students = getStudents(users.results);

//       let studentPromises = locals.students.map((student) => {
//         return bbAPI.users.getUser(student.userId, token);
//       });

//       // bbAPI.users.getUser(locals.students[0].userId, token)
//       Promise.all(studentPromises)
//         .then((student) => {
//           locals.students = student;
//           assignmentAPI.get(req.session.assignmentId)
//             .then((assignment) => {
//               if (!assignment) {
//                 return res.render('instructor/create', locals);
//               }
              
//               return res.render('instructor/show', locals);
//             })
//             .catch((err) => {
//               console.log(err);
//               return res.status(500).send(err);
//             });
//         })
//         .catch((err) => {
//           console.log(err);
//           return res.status(500).send(err);
//         });
//     })
//     .catch((err) => {
//       return res.status(500).send(err);
//     });
// }

function getStudents (users) {
  return users.filter((user) => {
    return user.courseRoleId === 'Student';
  });
}

module.exports = router;
