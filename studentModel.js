// studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
