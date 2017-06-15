/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

// Middleware to validate role
function isInstructor (req, res, next) {
  if (req.session.role !== 'Instructor') {
    return res.status(401).send('Unauthorized');
  }

  next();
}

function isLearner (req, res, next) {
  if (req.session.role !== 'Learner') {
    return res.status(401).send('Unauthorized');
  }

  next();
}

exports.isInstructor = isInstructor;
exports.isLearner = isLearner;
