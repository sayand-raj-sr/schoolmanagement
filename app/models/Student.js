import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // <- changed from classId to class
  rollNumber: { type: String, required: true },
  age: { type: Number, required: true },
  contactInfo: {
    phone: { type: String },
    email: { type: String }
  }
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;