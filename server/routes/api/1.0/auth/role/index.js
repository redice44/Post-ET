
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
