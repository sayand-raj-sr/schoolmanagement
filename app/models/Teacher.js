import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: { type: [String], default: [] }, // subjects entered manually as strings
  experience: { type: Number, default: 0 },
  role: { type: String, default: "teacher" }, // default role
  contactInfo: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
});

// Prevent recompiling model during hot reload
const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

export default Teacher;