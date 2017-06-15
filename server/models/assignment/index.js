/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gradedSchema = new Schema({
  columnId: String,
  maxPoints: Number,
});

let assignmentSchema = new Schema({
  ID: String,
  name: String,
  description: String,
  courseId: String,
  contentId: String,
  graded: gradedSchema,
  dueDate: Date,
  learners: [String]
});

mongoose.model('Assignment', assignmentSchema);
