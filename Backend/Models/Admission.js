const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  fathername: { type: String, required: true },
  cnic: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  domicile: { type: String, required: true },
  postalcode: { type: String, required: true },
  city: { type: String, required: true },
  guardianname: { type: String, required: true },
  guardianrelation: { type: String, required: true },
  postaladdress: { type: String, required: true },
  ssc: {
    group: { type: String, required: true },
    rollNo: { type: String, required: true },
    board: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
  },
  hssc: {
    group: { type: String, required: true },
    rollNo: { type: String, required: true },
    board: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
  },
  choices: [
    {
      discipline: String,
      shift: String,
    },
  ],
});

module.exports = mongoose.model('Admission', AdmissionSchema);
