const mongoose = require('mongoose');

/* Model */
const Assignment = mongoose.model('Assignment');

function get (assignmentId) {
  const q = {
    ID: assignmentId
  };

  return Assignment.findOne(q);
}

function create (assignmentData) {
  const assignment = new Assignment(assignmentData);
  return assignment.save();
}

exports.get = get;
exports.create = create;