import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

export default mongoose.models.Class || mongoose.model("Class", classSchema);