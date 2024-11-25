const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
  },
  course: {
    type: [String], // Array of strings for selected courses
  },
  createDate: {
    type: Date,
    default: Date.now, // Optional: Set default to current date and time
  },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
