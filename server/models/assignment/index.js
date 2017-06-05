const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let assignmentSchema = new Schema({
  ID: String,
  name: String
});

mongoose.model('Assignment', assignmentSchema);
