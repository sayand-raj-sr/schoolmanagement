import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // keep as 'class' if frontend sends 'class'
  rollNumber: { type: String, required: true },
  age: { type: Number, required: true },
  contactInfo: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" } // added email
  }
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;