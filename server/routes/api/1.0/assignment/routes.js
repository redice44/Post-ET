/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const assignmentAPI = require('./index');
const bbAPI = require('../../bb');
const userAPI = require('../user');

/*
  Renders a display grid for the assignment. Displays all students'
  post to the assignment in a randomized order.
*/
router.get('/:asId', (req, res) => {
  assignmentAPI.get(req.params.asId)
    .then((assignment) => {
      let locals = {
        assignment: assignment
      };

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

      locals.posts = [];
      while (posts.length > 0) {
        // Randomly splices an element and pushes it to locals.post
        locals.posts.push(posts.splice(Math.floor(Math.random() * posts.length), 1).pop());
      }

      return res.render('grid', locals);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

// Creates new assignment
router.post('/', (req, res) => {
  let dueDate = getDate(req.body.dueDate);

  let assignmentData = {
    ID: req.body.asId,
    name: req.body.name,
    description: req.body.description,
    courseId: req.session.courseId,
    contentId: req.session.contentId,
    dueDate: dueDate
  };

  if (req.body.graded) {
    assignmentData.graded = true;
    if (req.body.maxPoints) {
      assignmentData.maxPoints = req.body.maxPoints;
    } else {
      assignmentData.maxPoints = 0;
    }
  }

  assignmentAPI.create(assignmentData, req.session.envId)
    .then((assignment) => {
      // update blackboard content item
      return res.redirect(`/instructor/as/${assignment.ID}/`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

// Updates an assignment
// update to put. Using post for now since I'm testing with forms.
router.post('/:asId', (req, res) => {
  let dueDate = getDate(req.body.dueDate);

  let assignmentData = {
    name: req.body.name,
    description: req.body.description,
    dueDate: dueDate
  };

  if (req.body.graded) {
    assignmentData.graded = true;
    if (req.body.maxPoints) {
      assignmentData.maxPoints = req.body.maxPoints;
    } else {
      assignmentData.maxPoints = 0;
    }
  }

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

function getDate (date) {
  // date is sent mm-dd-yyyy
  let dueDate = date.split('-');
  dueDate = new Date(`${dueDate[2]}-${dueDate[0]}-${dueDate[1]}T23:59:00`);
  dueDate.setHours(dueDate.getHours() + Math.floor(dueDate.getTimezoneOffset() / 60));

  return dueDate;
}

module.exports = router;
