const express = require('express');
const router = express.Router();
const path = require('path');

const assignmentAPI = require('../api/1.0/assignment');
const userAPI = require('../api/1.0/user');
const bbAPI = require('../api/bb');
const roleAuth = require('../api/1.0/auth/role');
const securityUtil = require('../../util/security');

router.all('*', roleAuth.isInstructor);

router.get('/', (req, res) => {
  res.render('instructor/dash');
});

router.get('/:asId', (req, res) => {
  let locals = {
    assignmentName: req.session.assignmentName
  };

  let assignmentHash = securityUtil.hashAssignment({
    envId: req.session.envId,
    courseId: req.params.asId,
    contentId: ''
  });

  assignmentAPI.findOne({ ID: assignmentHash})
    .then((assignment) => {
      userAPI.find({
        ID: { $in: assignment.learners }
      })
        .then((learners) => {
          // res.send(learners);
          locals.learners = learners;
          return res.render('instructor/show', locals);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send(err);
        })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });


  // bbAPI.course.users.getStudents(req.session.courseId)
  //   .then((students) => {
  //     console.log('Received students in course');
  //     console.log(students);
  //     let studentsHash = students.map((student) => {
  //       let hashString = {
  //         envId: req.session.envId,
  //         courseId: req.session.courseId,
  //         userId: student.userId
  //       };
  //       return { ID: securityUtil.hashUser(hashString) };
  //     });

  //     let studentsData = students.map((student, i) => {
  //       return {
  //         ID: studentsHash[i].ID,
  //         role: student.courseRoleId,
  //         envUserId: student.userId
  //       };
  //     });

  //     console.log('student hash');
  //     console.log(studentsHash);
  //     console.log('\nstudent data');
  //     console.log(studentsData);

  //     userAPI.updateUsers(studentsHash, studentsData)
  //       .then((updatedStudents) => {
  //         console.log('Updated students');
  //         console.log(updatedStudents);
  //         // could be empty I think
  //         let unnamedStudents = updatedStudents.filter((student) => {
  //           return !student.name;
  //         });

  //         console.log('unnamed students');
  //         console.log(unnamedStudents);

  //         if (unnamedStudents.length === 0) {
  //           // done return some page thing
  //           return res.send('quick exit');
  //         }

  //         let promises = unnamedStudents.map((student) => {
  //           return bbAPI.users.getUser(student.envUserId);
  //         });

  //         Promise.all(promises)
  //           .then((students) => {
  //             console.log('All student data');
  //             console.log(students);
  //             studentsHash = students.map((student) => {
  //               let hashString = {
  //                 envId: req.session.envId,
  //                 courseId: req.session.courseId,
  //                 userId: student.id
  //               };
  //               return { ID: securityUtil.hashUser(hashString) };
  //             });

  //             studentsData = students.map((student, i) => {
  //               return {
  //                 ID: studentsHash[i].ID,
  //                 // role: student.courseRoleId,
  //                 // envUserId: student.userId,
  //                 name: `${student.name.given} ${student.name.family}`
  //               };
  //             });

  //             userAPI.updateUsers(studentsHash, studentsData)
  //               .then((updatedStudents) => {
  //                 // then get all the students and send to view
  //                 console.log('all updated students');
  //                 console.log(updatedStudents);
  //                 return res.send('yup');
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //                 return res.status(500).send(err);
  //               });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             return res.status(500).send(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return res.status(500).send(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   });

  // res.render('instructor/show', locals);
});

router.get('/:asId/create', (req, res) => {
  let locals = {
    assignmentId: securityUtil.hashAssignment(req.session),
    assignmentName: req.session.assignmentName
  };

  res.render('instructor/create', locals);
});

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

module.exports = router;
