const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gradedSchema = new Schema({
  columnId: String,
  maxPoints: Number
});

let assignmentSchema = new Schema({
  ID: String,
  name: String,
  description: String,
  courseId: String,
  contentId: String,
  graded: gradedSchema,
  learners: [String]
});

mongoose.model('Assignment', assignmentSchema);
