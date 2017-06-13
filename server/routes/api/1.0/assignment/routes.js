const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const assignmentAPI = require('./index');
const bbAPI = require('../../bb');
const userAPI = require('../user');

router.get('/:asId', (req, res) => {
  console.log('asid', req.params.asId);
  assignmentAPI.get(req.params.asId)
    .then((assignment) => {
      let locals = {};

      console.log('learners', assignment.learners);
      let posts = assignment.learners.map((learner) => {
        if (learner.post) {
          let p = learner.post;
          p.name = learner.name;
          return p;
        }
        return null;
      });

      posts = posts.filter((post) => {
        return !!post;
      });

      console.log('posts', posts);

      // while (posts.length > 9) {
      //   // Remove a random post
      //   posts.splice(Math.floor(Math.random() * posts.length), 1);
      // }

      let placeHolders = [
        {
          type: 'image',
          width: 640,
          height: 479,
          url: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/19227112_279338242474542_92401153312030720_n.jpg',
          name: 'Nicole Sanchez'
        },
        {
          type: 'video',
          width: 640,
          height: 640,
          url: 'https://scontent.cdninstagram.com/t50.2886-16/14312594_346881262368492_890544015_n.mp4',
          name: 'Matt Thomson'
        },
        {
          type: 'image',
          width: 640,
          height: 640,
          url: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14498996_1305203062824637_4570037742032912384_n.jpg',
          name: 'Matt Thomson'
        },
        {
          type: 'image',
          width: 640,
          height: 479,
          url: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/19121214_475552749452517_5304050118230540288_n.jpg',
          name: 'Nicole Sanchez'
        },
        {
          type: 'image',
          width: 640,
          height: 640,
          url: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14272190_138092099979543_2004957732_n.jpg',
          name: 'Matt Thomson'
        }
      ];

      while (posts.length < 9) {
        // Populate with placeholder image
        posts.push(placeHolders[Math.floor(Math.random() * placeHolders.length)]);
      }

      locals.posts = posts;
      return res.render('grid', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  // assignmentAPI.findOne({ ID: req.params.asId })
  //   .then((assignment) => {
  //     // return some display page I guess
  //     bbAPI.course.grades.getColumnGrades(assignment.courseId, assignment.graded.columnId)
  //       .then((grades) => {
  //         console.log(grades);
  //         return res.send(grades);
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
});

// Creates new assignment
router.post('/', (req, res) => {
  console.log(req.body);
  let assignmentData = {
    ID: req.body.asId,
    name: req.body.name,
    description: req.body.description,
    courseId: req.session.courseId,
    contentId: req.session.contentId,
  };

  if (req.body.graded) {
    assignmentData.graded = true;
    if (req.body.maxPoints) {
      assignmentData.maxPoints = req.body.maxPoints;
    } else {
      assignmentData.maxPoints = 0;
    }
  }

  console.log('assignment data');
  console.log(assignmentData);



  // bbAPI.course.grades.deleteColumn(assignmentData.courseId)
  //   .then((asyncRes) => {



      assignmentAPI.create(assignmentData, req.session.envId)
        .then((assignment) => {
          // redirect for now
          // update blackboard content item
          return res.redirect(`/instructor/as/${assignment.ID}/`);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send(err);
        });




    // })
    // .catch((err) => {
    //   console.log(err);
    //   return res.status(500).send(err);
    // });

});

// Updates an assignment
// update to put. Using post for now since I'm testing with forms.
router.post('/:asId', (req, res) => {
  let assignmentData = {
    name: req.body.name,
    description: req.body.description
  };

  assignmentAPI.update(req.params.asId, assignmentData)
    .then((assignment) => {
      // redirect for now
      // update blackboard content item
      return res.redirect(`/instructor/as/${assignment.ID}/`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

// Updates a learner's grade for the assignment
// Probably should use put. 
router.post('/:asId/learner/:userId', (req, res) => {
  let grade = {
    score: req.body.grade
  };

  if (req.body.feedback) {
    grade.feedback = req.body.feedback;
  }

  console.log('grade', grade);
  userAPI.grade(req.params.userId, req.params.asId, grade)
    .then(() => {
      assignmentAPI.updateGrade(req.params.asId, req.body.lId, grade)
        .then(() => {
          return res.redirect(`/instructor/as/${req.params.asId}`);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
